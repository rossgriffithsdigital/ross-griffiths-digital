import { NextResponse } from "next/server";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

/**
 * Contact form handler — Amazon SES.
 *
 * Required environment variables (Vercel → Settings → Environment Variables):
 *   SES_REGION              e.g. us-east-2  (matches Lambda stack — already set in Vercel)
 *   AWS_ACCESS_KEY_ID       IAM user with ses:SendEmail only
 *   AWS_SECRET_ACCESS_KEY
 *   FROM_EMAIL              a verified SES sender  (matches Lambda stack)
 *   TO_EMAIL                where enquiries land   (matches Lambda stack)
 *
 * If SES is still in the sandbox, TO_EMAIL must also be verified.
 * Request production access before launch or real enquiries will bounce.
 */

const REQUIRED = [
  "SES_REGION",
  "AWS_ACCESS_KEY_ID",
  "AWS_SECRET_ACCESS_KEY",
  "FROM_EMAIL",
  "TO_EMAIL",
] as const;

export async function POST(req: Request) {
  let payload;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const { name, email, phone, business, message } = payload ?? {};

  if (!name || !email || !phone || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(email))) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  if (!/\d{10,}/.test(String(phone).replace(/\D/g, ""))) {
    return NextResponse.json({ error: "Invalid phone" }, { status: 400 });
  }

  const missing = REQUIRED.filter((k) => !process.env[k]);
  if (missing.length) {
    console.error("[contact] SES not configured. Missing:", missing.join(", "));
    console.error("[contact] LOST ENQUIRY:", { name, email, phone, business, message });
    return NextResponse.json({ error: "Mail not configured" }, { status: 500 });
  }

  const ses = new SESv2Client({
    region: process.env.SES_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

  const body = [
    `Name:     ${name}`,
    `Business: ${business || "—"}`,
    `Email:    ${email}`,
    `Phone:    ${phone}`,
    "",
    message,
  ].join("\n");

  try {
    await ses.send(
      new SendEmailCommand({
        FromEmailAddress: process.env.FROM_EMAIL,
        Destination: { ToAddresses: [process.env.TO_EMAIL!] },
        ReplyToAddresses: [String(email)],
        Content: {
          Simple: {
            Subject: { Data: `New enquiry — ${name}`, Charset: "UTF-8" },
            Body: { Text: { Data: body, Charset: "UTF-8" } },
          },
        },
      }),
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] SES send failed:", err);
    console.error("[contact] LOST ENQUIRY:", { name, email, phone, business, message });
    return NextResponse.json({ error: "Send failed" }, { status: 500 });
  }
}

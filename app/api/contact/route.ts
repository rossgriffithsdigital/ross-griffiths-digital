import { NextResponse } from "next/server";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

/**
 * Contact form handler — Amazon SES.
 *
 * Required environment variables (Vercel → Settings → Environment Variables):
 *   AWS_REGION              e.g. ca-central-1
 *   AWS_ACCESS_KEY_ID       IAM user with ses:SendEmail only
 *   AWS_SECRET_ACCESS_KEY
 *   CONTACT_FROM            a verified SES sender, e.g. site@rossgriffithsdigital.com
 *   CONTACT_TO              where enquiries land, e.g. hello@rossgriffithsdigital.com
 *
 * If SES is still in the sandbox, CONTACT_TO must also be verified.
 * Request production access before launch or real enquiries will bounce.
 */

const REQUIRED = [
  "AWS_REGION",
  "AWS_ACCESS_KEY_ID",
  "AWS_SECRET_ACCESS_KEY",
  "CONTACT_FROM",
  "CONTACT_TO",
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

  const missing = REQUIRED.filter((k) => !process.env[k]);
  if (missing.length) {
    // Fail loudly in the logs rather than silently swallowing a real enquiry.
    console.error("[contact] SES not configured. Missing:", missing.join(", "));
    console.error("[contact] LOST ENQUIRY:", { name, email, phone, business, message });
    return NextResponse.json({ error: "Mail not configured" }, { status: 500 });
  }

  const ses = new SESv2Client({
    region: process.env.AWS_REGION,
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
        FromEmailAddress: process.env.CONTACT_FROM,
        Destination: { ToAddresses: [process.env.CONTACT_TO!] },
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

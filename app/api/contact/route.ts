import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, phone, business, message } = await req.json();

    if (!name || !email || !phone || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // TODO: wire to Resend, Formspree, or a Vercel Postgres table.
    // Set RESEND_API_KEY in Vercel → Settings → Environment Variables, then:
    //
    // await fetch("https://api.resend.com/emails", {
    //   method: "POST",
    //   headers: {
    //     Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     from: "site@rossgriffithsdigital.com",
    //     to: "hello@rossgriffithsdigital.com",
    //     subject: `New enquiry — ${name}`,
    //     text: `${name} (${business || "no business"})\n${email} · ${phone}\n\n${message}`,
    //   }),
    // });

    console.log("[contact]", { name, email, phone, business, message });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}

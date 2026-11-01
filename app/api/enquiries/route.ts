import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

/**
 * Enquiry form delivery endpoint.
 *
 * Validates server-side (never trust the browser), applies passive
 * anti-spam measures (honeypot + time-trap + best-effort rate limit),
 * then delivers the enquiry by email via Resend.
 *
 * Environment variables (see .env.example):
 *   RESEND_API_KEY  — from resend.com/api-keys
 *   ENQUIRY_TO      — destination inbox   (default: info@mediusunus.com)
 *   ENQUIRY_FROM    — verified sender     (default: Medius Unus Website <enquiries@mediusunus.com>)
 */

const enquiryLabels: Record<string, string> = {
  services: "Services",
  partnership: "Partnership",
  investment: "Investment opportunity",
  other: "Other",
};

const schema = z.object({
  fullName: z.string().min(2).max(120),
  organisation: z.string().max(160).optional(),
  email: z.string().email().max(160),
  telephone: z.string().max(60).optional(),
  enquiryType: z.enum(["services", "partnership", "investment", "other"]),
  message: z.string().min(20).max(5000),
  privacy: z.literal(true),
  // anti-spam: honeypot must stay empty; startedAt records page-load time
  companyWebsite: z.string().max(200).optional(),
  startedAt: z.number().positive(),
});

// Best-effort in-memory rate limiting. Serverless instances are ephemeral,
// so this softens abuse rather than guaranteeing a hard cap.
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://medius-unus.vercel.app";

function renderEmail(d: {
  fullName: string;
  organisation?: string;
  email: string;
  telephone?: string;
  enquiryType: string;
  message: string;
}): string {
  const field = (label: string, value: string) => `
      <tr><td style="padding:0 32px 20px;">
        <p style="margin:0 0 4px;color:#7a5a1a;font:700 11px/1 Arial,sans-serif;letter-spacing:.18em;text-transform:uppercase;">${label}</p>
        <p style="margin:0;color:#14213d;font:400 15px/1.55 Arial,sans-serif;">${escapeHtml(value)}</p>
      </td></tr>`;

  return `<!DOCTYPE html>
<html><body style="margin:0;padding:32px 16px;background:#f8f5ee;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e7e2d6;">

    <!-- Brand -->
    <tr><td style="padding:36px 32px 0;text-align:center;">
      <img src="${SITE_URL}/medius-unus-logo.png" alt="Medius Unus Nigeria Limited" width="168" height="138" style="width:168px;height:138px;display:block;margin:0 auto;border:0;" />
      <p style="margin:22px auto 0;width:56px;border-top:2px solid #c79d4b;font-size:0;line-height:0;">&nbsp;</p>
      <h1 style="margin:18px 0 0;color:#0d2b1f;font:600 26px/1.2 Georgia,'Times New Roman',serif;">Website enquiry</h1>
      <p style="margin:8px 0 0;color:#8a938c;font:400 13px/1.4 Arial,sans-serif;">Received ${new Date().toUTCString()}</p>
    </td></tr>

    <!-- Fields -->
    <tr><td style="padding:32px 0 8px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${field("Name", d.fullName)}
        ${field("Organisation", d.organisation || "—")}
        ${field("Email", d.email)}
        ${field("Telephone", d.telephone || "—")}
        ${field("Enquiry type", enquiryLabels[d.enquiryType] ?? d.enquiryType)}
      </table>
    </td></tr>

    <!-- Message -->
    <tr><td style="padding:0 32px 32px;">
      <p style="margin:0 0 4px;color:#7a5a1a;font:700 11px/1 Arial,sans-serif;letter-spacing:.18em;text-transform:uppercase;">Message</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
        <td style="background:#f8f5ee;border-left:3px solid #c79d4b;padding:16px 18px;color:#14213d;font:400 15px/1.65 Arial,sans-serif;white-space:pre-line;">${escapeHtml(d.message)}</td>
      </tr></table>
    </td></tr>

    <!-- Footer -->
    <tr><td style="background:#0d2b1f;padding:22px 32px;text-align:center;">
      <p style="margin:0;color:#c79d4b;font:700 10px/1 Arial,sans-serif;letter-spacing:.3em;text-transform:uppercase;">Medius Unus Nigeria Limited</p>
      <p style="margin:8px 0 0;color:#f8f5ee;font:400 13px/1.5 Arial,sans-serif;">
        Reply directly to this email to respond to ${escapeHtml(d.fullName)} &mdash; reply-to is set to their address.
      </p>
    </td></tr>

  </table>
</body></html>`;
}

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Some details are missing or invalid. Please review the form and try again." },
      { status: 400 },
    );
  }
  const d = parsed.data;

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many submissions from this connection. Please try again later." },
      { status: 429 },
    );
  }

  // Bots: honeypot filled or submitted within 3 seconds of page load.
  // Accept silently so the bot believes it succeeded.
  if (d.companyWebsite || Date.now() - d.startedAt < 3000) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "Enquiry delivery is not configured yet. Please email info@mediusunus.com directly while we complete setup.",
      },
      { status: 503 },
    );
  }

  const to = process.env.ENQUIRY_TO ?? "info@mediusunus.com";
  const from =
    process.env.ENQUIRY_FROM ?? "Medius Unus Website <enquiries@mediusunus.com>";

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: d.email,
    subject: `Website enquiry: ${enquiryLabels[d.enquiryType] ?? d.enquiryType} — ${d.fullName}`,
    html: renderEmail(d),
  });

  if (error) {
    return NextResponse.json(
      { error: "The enquiry could not be delivered. Please try again shortly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

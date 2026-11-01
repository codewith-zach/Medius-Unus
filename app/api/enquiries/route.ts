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

function renderEmail(d: {
  fullName: string;
  organisation?: string;
  email: string;
  telephone?: string;
  enquiryType: string;
  message: string;
}): string {
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:10px 16px;color:#5c6b62;font:600 12px/1.4 Arial,sans-serif;text-transform:uppercase;letter-spacing:.08em;width:150px;border-bottom:1px solid #e7e2d6;vertical-align:top;">${label}</td>
      <td style="padding:10px 16px;color:#14213d;font:400 15px/1.55 Arial,sans-serif;border-bottom:1px solid #e7e2d6;">${escapeHtml(value)}</td>
    </tr>`;

  return `<!DOCTYPE html>
<html><body style="margin:0;padding:24px;background:#f8f5ee;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e7e2d6;">
    <tr>
      <td style="background:#0d2b1f;padding:24px 28px;">
        <p style="margin:0;color:#c79d4b;font:600 11px/1 Arial,sans-serif;letter-spacing:.3em;text-transform:uppercase;">Medius Unus Nigeria Limited</p>
        <p style="margin:8px 0 0;color:#f8f5ee;font:600 22px/1.2 Georgia,serif;">Website enquiry</p>
      </td>
    </tr>
    <tr><td style="padding:8px 0 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${row("Name", d.fullName)}
        ${row("Organisation", d.organisation || "—")}
        ${row("Email", d.email)}
        ${row("Telephone", d.telephone || "—")}
        ${row("Enquiry type", enquiryLabels[d.enquiryType] ?? d.enquiryType)}
        ${row("Message", d.message)}
      </table>
    </td></tr>
    <tr>
      <td style="padding:18px 28px 24px;">
        <p style="margin:0;color:#8a938c;font:400 12px/1.5 Arial,sans-serif;">
          Reply directly to this email to respond to ${escapeHtml(d.fullName)} (reply-to is set to their address).
          Submitted ${new Date().toUTCString()}.
        </p>
      </td>
    </tr>
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

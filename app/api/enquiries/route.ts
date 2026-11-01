import { readFile } from "fs/promises";
import { join } from "path";
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

/**
 * Embedded logo (cid: attachment) so the brand renders even in mail clients
 * that block remote images (Apple Mail default). Falls back to the hosted
 * URL if the file can't be read from the deployment.
 */
type LogoSet = {
  stdSrc: string;
  lightSrc: string;
  attachments: { filename: string; content: string; contentId: string }[];
};

/**
 * Both logo variants (standard for light mode, cream-text for dark mode)
 * embedded as cid attachments so they render even where remote images are
 * blocked. Falls back to hosted URLs if the files can't be read.
 */
async function resolveLogos(): Promise<LogoSet> {
  const variants = [
    { file: "medius-unus-logo.png", cid: "medius-unus-logo" },
    { file: "medius-unus-logo-light.png", cid: "medius-unus-logo-light" },
  ];
  const attachments: LogoSet["attachments"] = [];
  const srcs: Record<string, string> = {};
  for (const v of variants) {
    try {
      const buf = await readFile(join(process.cwd(), "public", v.file));
      attachments.push({
        filename: v.file,
        content: buf.toString("base64"),
        contentId: v.cid,
      });
      srcs[v.cid] = `cid:${v.cid}`;
    } catch (e) {
      console.log(`[enquiry] logo fallback (${v.file}):`, e instanceof Error ? e.message : e);
      srcs[v.cid] = `${SITE_URL}/${v.file}`;
    }
  }
  console.log("[enquiry] logos embedded:", attachments.length);
  return { stdSrc: srcs["medius-unus-logo"], lightSrc: srcs["medius-unus-logo-light"], attachments };
}

function renderEmail(
  d: {
    fullName: string;
    organisation?: string;
    email: string;
    telephone?: string;
    enquiryType: string;
    message: string;
  },
  logos: { stdSrc: string; lightSrc: string }
): string {
  const label = "color:#7a5a1a;font:700 10px/1 Arial,sans-serif;letter-spacing:.18em;text-transform:uppercase;";
  const value = "margin:0;color:#14213d;font:400 15px/1.5 Arial,sans-serif;";
  const cell = (l: string, v: string) => `
        <td width="50%" style="padding:0 0 18px;vertical-align:top;">
          <p class="lbl" style="margin:0 0 5px;${label}">${l}</p>
          <p class="val" style="${value}">${escapeHtml(v)}</p>
        </td>`;

  return `<!DOCTYPE html>
<html>
<head>
  <meta name="color-scheme" content="light dark" />
  <style>
    /* Dark mode: restyle to emerald and swap to the cream logo variant.
       Clients that ignore this (older Outlook) keep the light design. */
    @media (prefers-color-scheme: dark) {
      .body-bg { background-color:#08170f !important; }
      .card { background-color:#0d2b1f !important; border-color:#1d4a35 !important; }
      .lbl { color:#c79d4b !important; }
      .val { color:#f8f5ee !important; }
      .serif { color:#f8f5ee !important; }
      .serif-dim { color:#9fb3a8 !important; }
      .meta { color:#9fb3a8 !important; }
      .msg-panel { background-color:#123024 !important; }
      .msg-text { color:#f8f5ee !important; }
      .footer-band { background-color:#0a2317 !important; }
      .logo-std { display:none !important; }
      .logo-light { display:block !important; }
    }
  </style>
</head>
<body class="body-bg" style="margin:0;padding:32px 16px;background:#f8f5ee;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="card" style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e7e2d6;">

    <!-- Letterhead: logo left, enquiry headline right -->
    <tr><td style="padding:34px 32px 26px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
        <td style="vertical-align:middle;width:190px;">
          <img src="${logos.stdSrc}" alt="Medius Unus Nigeria Limited" width="190" height="156" class="logo-std" style="width:190px;height:156px;display:block;border:0;" />
          <img src="${logos.lightSrc}" alt="Medius Unus Nigeria Limited" width="190" height="156" class="logo-light" style="width:190px;height:156px;display:none;border:0;" />
        </td>
        <td style="vertical-align:middle;text-align:right;">
          <p class="lbl" style="margin:0 0 8px;${label}">Website enquiry</p>
          <p style="margin:0 0 10px;display:inline-block;padding:6px 14px;border:1px solid #c79d4b;color:#7a5a1a;font:600 12px/1 Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase;">${enquiryLabels[d.enquiryType] ?? d.enquiryType}</p>
          <p class="meta" style="margin:0;color:#8a938c;font:400 12px/1.4 Arial,sans-serif;">${new Date().toUTCString()}</p>
        </td>
      </tr></table>
      <p style="margin:26px 0 0;border-top:2px solid #c79d4b;font-size:0;line-height:0;">&nbsp;</p>
    </td></tr>

    <!-- From whom -->
    <tr><td style="padding:24px 32px 6px;">
      <p class="lbl" style="margin:0 0 5px;${label}">From</p>
      <p class="serif" style="margin:0;color:#0d2b1f;font:600 20px/1.3 Georgia,'Times New Roman',serif;">${escapeHtml(d.fullName)}${d.organisation ? ` <span class="serif-dim" style="font-weight:400;color:#8a938c;">&middot; ${escapeHtml(d.organisation)}</span>` : ""}</p>
    </td></tr>

    <!-- Contact details: two-column grid -->
    <tr><td style="padding:18px 32px 8px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>${cell("Email", d.email)}${cell("Telephone", d.telephone || "—")}</tr>
      </table>
    </td></tr>

    <!-- Message -->
    <tr><td style="padding:14px 32px 32px;">
      <p class="lbl" style="margin:0 0 8px;${label}">Message</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
        <td class="msg-panel" style="background:#f8f5ee;border-left:3px solid #c79d4b;padding:18px 20px;color:#14213d;font:400 16px/1.65 Georgia,'Times New Roman',serif;white-space:pre-line;">${escapeHtml(d.message)}</td>
      </tr></table>
    </td></tr>

    <!-- Footer -->
    <tr><td class="footer-band" style="background:#0d2b1f;padding:22px 32px;text-align:center;">
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
  const logos = await resolveLogos();
  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: d.email,
    subject: `Website enquiry: ${enquiryLabels[d.enquiryType] ?? d.enquiryType} — ${d.fullName}`,
    html: renderEmail(d, logos),
    ...(logos.attachments.length ? { attachments: logos.attachments } : {}),
  });

  if (error) {
    return NextResponse.json(
      { error: "The enquiry could not be delivered. Please try again shortly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

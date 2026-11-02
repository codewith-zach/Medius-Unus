import { notFound } from "next/navigation";

/**
 * Catch-all for unknown paths under a locale prefix. Routing them here
 * (instead of letting them fall through to Next's default 404) renders
 * the styled [lang]/not-found page with the full site chrome.
 */
export default function CatchAllPage() {
  notFound();
}

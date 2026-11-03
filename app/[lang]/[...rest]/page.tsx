import { notFound } from "next/navigation";

/**
 * Catch-all for unknown paths under a locale prefix. Routing them here
 * (instead of letting them fall through to Next's default 404) renders
 * the styled [lang]/not-found page with the full site chrome.
 *
 * `instant = false` marks the route as blocking: a segment that only
 * throws can never produce a prerender shell, and the cacheComponents
 * validation pass surfaces that as a dev-overlay console error.
 */
export const instant = false;

export default function CatchAllPage() {
  notFound();
}

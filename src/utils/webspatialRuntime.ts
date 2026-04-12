/**
 * Detect WebSpatial Runtime (visionOS shell, PICO Web App, etc.).
 * See docs/api/react-sdk/dom-api/userAgent.md
 */
export function hasWebSpatialRuntime(): boolean {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent;
  return (
    /WebSpatial\/\S+/.test(ua) ||
    /PicoWebApp\//.test(ua) ||
    /WSAppShell\//.test(ua)
  );
}

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const DEV_SERVER_PORT = Number(process.env.DEV_SERVER_PORT) || 5173;

/**
 * After `pnpm dev:cf` or `pnpm tunnel:cf`, paste the printed https://….trycloudflare.com URL here (no trailing slash)
 * so asset URLs and HMR work through the tunnel. Leave empty for localhost-only dev.
 * Override port for both Vite and tunnel scripts: DEV_SERVER_PORT=5174 pnpm dev:cf
 */
const CLOUDFLARE_TUNNEL_ORIGIN = "";

function tunnelServerOptions() {
  const raw =
    process.env.CLOUDFLARE_TUNNEL_ORIGIN?.replace(/\/$/, "") ??
    CLOUDFLARE_TUNNEL_ORIGIN.trim();
  if (!raw) return {};
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return {};
  }
  const host = url.hostname;
  return {
    origin: raw,
    hmr: {
      protocol: "wss" as const,
      host,
      clientPort: 443,
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: DEV_SERVER_PORT,
    strictPort: true,
    host: true,
    allowedHosts: [".trycloudflare.com", "localhost", "127.0.0.1"],
    ...tunnelServerOptions(),
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});

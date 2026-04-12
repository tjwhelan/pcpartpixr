/**
 * Quick tunnel only (use when Vite is already running).
 * Same port as vite.config.ts: set DEV_SERVER_PORT or default 5173.
 */
import { spawn } from "node:child_process";

const port = Number(process.env.DEV_SERVER_PORT) || 5173;
const host = "127.0.0.1";

const cf = spawn("cloudflared", ["tunnel", "--url", `http://${host}:${port}`], {
  stdio: "inherit",
  shell: true,
});

cf.on("exit", (code) => process.exit(code ?? 1));

/**
 * Starts Vite, waits for the dev server port, then runs a Cloudflare quick tunnel to it.
 * Requires the cloudflared CLI: https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/
 *
 * Port matches vite.config.ts via DEV_SERVER_PORT (default 5173).
 */
import { spawn } from "node:child_process";
import net from "node:net";

const port = Number(process.env.DEV_SERVER_PORT) || 5173;
const host = "127.0.0.1";

function waitForPort(p, h = host, timeoutMs = 90_000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const attempt = () => {
      const socket = net.createConnection({ port: p, host: h }, () => {
        socket.end();
        resolve();
      });
      socket.on("error", () => {
        socket.destroy();
        if (Date.now() - start > timeoutMs) {
          reject(new Error(`Dev server did not open on ${h}:${p} within ${timeoutMs}ms`));
        } else {
          setTimeout(attempt, 200);
        }
      });
    };
    attempt();
  });
}

const children = [];
/** @type {import('node:child_process').ChildProcess | null} */
let cfProc = null;

function shutdown() {
  for (const c of children) {
    try {
      if (c && !c.killed) c.kill("SIGTERM");
    } catch {
      /* ignore */
    }
  }
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

const env = { ...process.env, DEV_SERVER_PORT: String(port) };

const vite = spawn("vite", [], {
  stdio: "inherit",
  shell: true,
  env,
});
children.push(vite);

vite.on("exit", (code) => {
  if (cfProc && !cfProc.killed) {
    try {
      cfProc.kill("SIGTERM");
    } catch {
      /* ignore */
    }
  }
  process.exit(code ?? 0);
});

try {
  await waitForPort(port);
} catch (e) {
  console.error(e instanceof Error ? e.message : e);
  vite.kill("SIGTERM");
  process.exit(1);
}

console.error(
  `\n[cloudflared] Tunneling to http://${host}:${port}/ (paste the https URL into vite.config.ts CLOUDFLARE_TUNNEL_ORIGIN for HMR)\n`,
);

cfProc = spawn("cloudflared", ["tunnel", "--url", `http://${host}:${port}`], {
  stdio: "inherit",
  shell: true,
  env,
});
children.push(cfProc);

cfProc.on("exit", (code) => {
  if (vite && !vite.killed) {
    try {
      vite.kill("SIGTERM");
    } catch {
      /* ignore */
    }
  }
  process.exit(code ?? 0);
});

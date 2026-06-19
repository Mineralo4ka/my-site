import { createServer } from "node:http";
import { existsSync, readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { handleBriefPayload, TelegramBriefError } from "./telegram.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const rootDir = resolve(__dirname, "..");
const distDir = resolve(rootDir, "dist");
const port = Number(process.env.PORT) || 3000;
const maxBodySize = 64 * 1024;

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

function loadLocalEnv() {
  const envPath = join(rootDir, ".env.local");

  if (!existsSync(envPath)) {
    return;
  }

  const lines = readFileSync(envPath, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) {
      continue;
    }

    const [key, ...valueParts] = trimmed.split("=");
    process.env[key.trim()] ||= valueParts.join("=").trim();
  }
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

function readJsonBody(req) {
  return new Promise((resolveBody, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;

      if (body.length > maxBodySize) {
        reject(new TelegramBriefError("Request body is too large", 413));
        req.destroy();
      }
    });

    req.on("end", () => {
      try {
        resolveBody(body ? JSON.parse(body) : {});
      } catch {
        reject(new TelegramBriefError("Invalid JSON", 400));
      }
    });

    req.on("error", reject);
  });
}

async function handleBriefRequest(req, res) {
  if (req.method !== "POST") {
    sendJson(res, 405, { ok: false, error: "Method not allowed" });
    return;
  }

  try {
    const payload = await readJsonBody(req);
    const result = await handleBriefPayload(payload);
    sendJson(res, 200, result);
  } catch (error) {
    const statusCode = error instanceof TelegramBriefError ? error.statusCode : 500;
    sendJson(res, statusCode, {
      ok: false,
      error: statusCode >= 500 ? "Не удалось отправить бриф" : error.message,
    });
  }
}

async function serveStatic(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = decodeURIComponent(url.pathname);
  const safePath = normalize(pathname).replace(/^(\.\.[/\\])+/, "");
  let filePath = resolve(distDir, `.${safePath}`);

  if (!filePath.startsWith(distDir)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  if (pathname.endsWith("/")) {
    filePath = join(filePath, "index.html");
  }

  try {
    const content = await readFile(filePath);
    const ext = extname(filePath);
    const isAsset = filePath.includes(`${join("dist", "assets")}`);

    res.writeHead(200, {
      "Cache-Control": isAsset ? "public, max-age=31536000, immutable" : "no-cache",
      "Content-Type": contentTypes[ext] || "application/octet-stream",
    });
    res.end(content);
  } catch {
    const indexPath = join(distDir, "index.html");
    const content = await readFile(indexPath);

    res.writeHead(200, {
      "Cache-Control": "no-cache",
      "Content-Type": contentTypes[".html"],
    });
    res.end(content);
  }
}

loadLocalEnv();

createServer(async (req, res) => {
  if (req.url?.startsWith("/api/brief")) {
    await handleBriefRequest(req, res);
    return;
  }

  await serveStatic(req, res);
}).listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

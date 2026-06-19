import { handleBriefPayload, TelegramBriefError } from "./telegram.js";

const MAX_BODY_SIZE = 64 * 1024;

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;

      if (body.length > MAX_BODY_SIZE) {
        reject(new TelegramBriefError("Request body is too large", 413));
        req.destroy();
      }
    });

    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new TelegramBriefError("Invalid JSON", 400));
      }
    });

    req.on("error", reject);
  });
}

export function briefApiPlugin() {
  const attachBriefEndpoint = (middlewares) => {
    middlewares.use("/api/brief", async (req, res) => {
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
    });
  };

  return {
    name: "brief-api",
    configureServer(server) {
      attachBriefEndpoint(server.middlewares);
    },
    configurePreviewServer(server) {
      attachBriefEndpoint(server.middlewares);
    },
  };
}

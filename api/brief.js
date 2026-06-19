import { handleBriefPayload, TelegramBriefError } from "../server/telegram.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Method not allowed" });
    return;
  }

  try {
    const result = await handleBriefPayload(req.body);
    res.status(200).json(result);
  } catch (error) {
    const statusCode = error instanceof TelegramBriefError ? error.statusCode : 500;

    res.status(statusCode).json({
      ok: false,
      error: statusCode >= 500 ? "Не удалось отправить бриф" : error.message,
    });
  }
}

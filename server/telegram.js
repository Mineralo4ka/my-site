const TELEGRAM_API_URL = "https://api.telegram.org";
const MAX_BRIEF_LENGTH = 3900;

export class TelegramBriefError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.name = "TelegramBriefError";
    this.statusCode = statusCode;
  }
}

export async function sendBriefToTelegram(text, env = process.env) {
  const botToken = env.TELEGRAM_BOT_TOKEN;
  const chatId = env.TELEGRAM_CHAT_ID;
  const message = typeof text === "string" ? text.trim() : "";

  if (!botToken || !chatId) {
    throw new TelegramBriefError("Telegram bot is not configured", 500);
  }

  if (!message) {
    throw new TelegramBriefError("Brief text is required", 400);
  }

  if (message.length > MAX_BRIEF_LENGTH) {
    throw new TelegramBriefError("Brief text is too long", 400);
  }

  const response = await fetch(`${TELEGRAM_API_URL}/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      disable_web_page_preview: true,
    }),
  });

  if (!response.ok) {
    let details = "Telegram request failed";

    try {
      const payload = await response.json();
      details = payload.description || details;
    } catch {
      details = await response.text();
    }

    throw new TelegramBriefError(details, 502);
  }

  return response.json();
}

export async function handleBriefPayload(payload, env = process.env) {
  await sendBriefToTelegram(payload?.text, env);
  return { ok: true };
}

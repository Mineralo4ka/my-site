# Andrew Pavlenko — Video Editor Portfolio

Одностраничное портфолио видеомонтажёра на React, Vite и Tailwind CSS.

## Команды

- `npm run dev` — запуск локального сервера разработки
- `npm run build` — production-сборка
- `npm run lint` — проверка ESLint
- `npm run preview` — просмотр production-сборки
- `npm run start` — запуск production-сервера для VPS

## Telegram-бот для брифа

Форма брифа отправляет заявку на серверный путь `/api/brief`, а сервер уже пересылает текст в Telegram. Токен бота нельзя хранить в `src/App.jsx` или другом клиентском коде.

1. Создайте бота в Telegram через `@BotFather` и скопируйте токен.
2. Напишите любое сообщение своему боту.
3. Откройте `https://api.telegram.org/bot<ВАШ_ТОКЕН>/getUpdates` и найдите `chat.id`.
4. Создайте файл `.env.local` по примеру `.env.example`:

```env
TELEGRAM_BOT_TOKEN=123456789:replace_with_botfather_token
TELEGRAM_CHAT_ID=123456789
```

Для локальной проверки запустите `npm run dev` и отправьте тестовый бриф. При деплое добавьте эти же переменные окружения в настройках хостинга. В проекте есть serverless-функция `api/brief.js`, которая подходит для Vercel.

## Деплой на VPS

На VPS сайт нужно запускать как Node-приложение, потому что форма брифа отправляет данные на `/api/brief`.

1. Соберите проект локально:

```bash
npm run build
```

2. Через FileZilla загрузите на сервер:

- `dist`
- `server`
- `package.json`
- `package-lock.json`
- `.env.local`

3. В `.env.local` на сервере должны быть:

```env
TELEGRAM_BOT_TOKEN=ваш_токен_бота
TELEGRAM_CHAT_ID=ваш_chat_id
PORT=3000
```

4. На сервере в папке сайта запустите:

```bash
npm ci --omit=dev
npm run start
```

Для постоянной работы удобнее использовать PM2:

```bash
npm install -g pm2
pm2 start server/production.js --name nehold-creator
pm2 save
pm2 startup
```

5. Nginx должен проксировать домен на Node-сервер:

```nginx
server {
    server_name nehold-creator.ru www.nehold-creator.ru;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

После настройки Nginx включите HTTPS через Certbot или панель управления VPS.

## Контент

Основные данные находятся в `src/App.jsx`: профиль, навигация, проекты, услуги и этапы работы. Медиа лежат в `public/images` и `public/videos`.

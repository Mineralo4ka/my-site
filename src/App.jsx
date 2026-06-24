import { useEffect, useRef, useState } from "react";

const profile = {
  name: "Andrew Pavlenko",
  role: "Видеомонтажёр для бизнеса, экспертов и авторов",
  //email: "yourmail@example.com",
  instagram: "https://www.instagram.com/nehold_creator/",
  telegram: "https://t.me/Nehold",
  avatar: "/images/avatar.jpg",
};

const navItems = [
  { href: "#work", label: "Работы" },
  { href: "#services", label: "Услуги" },
  { href: "#process", label: "Процесс" },
  { href: "#contact", label: "Контакты" },
];

const projects = [
  {
    title: "DeepSchool",
    category: "Подкаст",
    year: "2026",
    format: "16:9",
    accent: "#f97316",
    video: "/videos/DS_podcast.mp4",
    cover: "/images/covers/DS_codecs.webp",
    originalUrl: "https://www.youtube.com/watch?v=stCi1eQSEYY",
    viewCount: 337,
    description:
      "Подкаст для DeepSchool: чистая склейка спикеров, аккуратные перебивки и спокойный темп для длинного экспертного выпуска.",
  },
  {
    title: "DeepSchool",
    category: "Разговорное",
    year: "2025",
    format: "16:9",
    accent: "#6366f1",
    video: "/videos/DS_15quest.mp4",
    cover: "/images/covers/DS_auto.webp",
    originalUrl: "https://www.youtube.com/watch?v=gpBkyiwOq88",
    viewCount: 549,
    description:
      "Разговорный выпуск DeepSchool с понятной структурой, титрами и плашками, чтобы сложная тема воспринималась легче.",
  },
  {
    title: "DeepSchool",
    category: "Интервью",
    year: "2026",
    format: "16:9",
    accent: "#0ea5e9",
    video: "/videos/DS_MOK.mp4",
    cover: "/images/covers/DS_MOK.webp",
    originalUrl: "https://www.youtube.com/watch?v=P7ndeN0yLig",
    viewCount: 846,
    description:
      "Интервью в формате мок-собеседования: разбор задачи, чистый монтаж созвона и вставки, которые помогают следить за мыслью.",
  },
  {
    title: "KURS",
    category: "Обзор",
    year: "2025",
    format: "16:9",
    accent: "#f59e0b",
    video: "/videos/KURS_horizont.mp4",
    cover: "/images/covers/kurs_horizont.webp",
    originalUrl: "https://www.youtube.com/watch?v=KKgZJRlUcMU",
    viewCount: 11123,
    description:
      "Обзор продукта KURS: крупные планы, демонстрация деталей и монтаж, который помогает быстро понять пользу устройства.",
  },
  {
    title: "KURS",
    category: "Shorts",
    year: "2025",
    format: "9:16",
    accent: "#14b8a6",
    video: "/videos/KURS_gangsters.mp4",
    cover: "/images/covers/KURS_gangsters.webp",
    originalUrl: "https://www.youtube.com/shorts/75chU5_slkI",
    viewCount: 12919492,
    description:
      "Короткий объясняющий ролик KURS с быстрым заходом, кино-вставками и титрами, которые удерживают внимание до конца.",
  },
  {
    title: "KURS Animation",
    category: "Shorts",
    year: "2026",
    format: "9:16",
    accent: "#ec4899",
    video: "/videos/KURS_animation.mp4",
    cover: "/images/covers/KURS_animation.webp",
    originalUrl: "https://www.youtube.com/shorts/cTog6z753tU",
    viewCount: 5552572,
    description:
      "Анимационный Shorts для KURS: простая визуализация сложной темы, схемы и темп, подходящий для образовательного контента.",
  },
  {
    title: "A4Food",
    category: "TikTok",
    year: "2026",
    format: "9:16",
    accent: "#eab308",
    video: "/videos/A4_drink.mp4",
    cover: "/images/covers/A4_drink.webp",
    originalUrl: "https://www.youtube.com/shorts/mxN8SbFI2iA",
    viewCount: 1890908,
    description:
      "Яркий TikTok для A4Food: приготовление напитка, реакции героев и крупные планы, которые делают продукт заметнее.",
  },
   {
    title: "A4Food",
    category: "TikTok",
    year: "2026",
    format: "9:16",
    accent: "#eab308",
    video: "/videos/A4_kobyakov.mp4",
    cover: "/images/covers/A4_kobyakov.webp",
    originalUrl: "https://www.youtube.com/shorts/sQvOVc_ESzw",
    viewCount: 2571061,
    description:
      "Обзор снеков с Кобяковым: быстрый темп, реакции, акценты на вкусах и подача, которая подходит для TikTok.",
  },
  {
    title: "GGSel",
    category: "TikTok",
    year: "2025",
    format: "9:16",
    accent: "#38bdf8",
    video: "/videos/ggsel_opros.mp4",
    cover: "/images/covers/ggsel_opros.webp",
    originalUrl: "https://www.tiktok.com/@ggsel.net/video/7585878823636372754",
    viewCount: 1800000,
    description:
      "Уличный опрос для GGSel: живые реакции, брендовые элементы и быстрый монтаж для лёгкого просмотра в Reels.",
  },
  {
    title: "GGSel",
    category: "TikTok",
    year: "2024",
    format: "9:16",
    accent: "#22c55e",
    video: "/videos/ggsel_vicecity.mp4",
    cover: "/images/covers/ggsel_vicecity.webp",
    originalUrl: "https://www.tiktok.com/@ggsel.net/video/7500908251769212177",
    viewCount: 166200,
    description:
      "Игровой TikTok для GGSel: сравнение GTA, динамичные вставки и подача, которая быстро вовлекает зрителя.",
  },
  {
    title: "BigCity",
    category: "Reels",
    year: "2024",
    format: "9:16",
    accent: "#06b6d4",
    video: "/videos/BigCity_kvartira.mp4",
    cover: "/images/covers/BigCity_kvartira.webp",
    originalUrl: "https://www.youtube.com/shorts/3ASJzRhvYFs",
    viewCount: 2000,
    description:
      "Reels для недвижимости BigCity: понятное объяснение рассрочки, инфографика и примеры, которые помогают разобраться в оффере.",
  },
  {
    title: "BigCity",
    category: "Reels",
    year: "2024",
    format: "9:16",
    accent: "#0ea5e9",
    video: "/videos/BigCity_moscow.mp4",
    cover: "/images/covers/BigCity_moscow.webp",
    originalUrl: "https://www.youtube.com/shorts/mIBveDn0rIo",
    viewCount: 240000,
    description:
      "Городской Reels для BigCity: история места, архивные кадры и визуализация, собранные в короткий понятный сюжет.",
  },
  {
    title: "Faina Li",
    category: "Reels",
    year: "2024",
    format: "9:16",
    accent: "#10b981",
    video: "/videos/faina_li.mp4",
    cover: "/images/covers/faina_li.webp",
    originalUrl: "https://www.youtube.com/shorts/nO9N7Mhypic",
    viewCount: 27676,
    description:
      "Образовательный Reels для Faina Li: китайский язык, живые примеры и быстрые вставки, которые помогают удержать внимание.",
  },
  {
    title: "MyCSGO",
    category: "Shorts",
    year: "2024",
    format: "9:16",
    accent: "#f97316",
    video: "/videos/MyCSGO.mp4",
    cover: "/images/covers/MyCSGO.webp",
    originalUrl: "https://www.youtube.com/shorts/BZUQxK2zuz0",
    viewCount: 115492,
    description:
      "Shorts для MyCSGO с кейс-челленджем: счётчик попыток, колесо выбора и реакции, которые держат азарт до финала.",
  },
  {
    title: "MarketCSGO",
    category: "Shorts",
    year: "2024",
    format: "9:16",
    accent: "#3b82f6",
    video: "/videos/MarketCSGO.mp4",
    cover: "/images/covers/MarketCSGO.webp",
    originalUrl: "https://www.youtube.com/shorts/2g84v49AYy0",
    viewCount: 1027619,
    description:
      "Shorts для MarketCSGO: быстрый разбор деталей Inferno, игровые вставки и понятная подача для аудитории CS.",
  },
  {
    title: "Fudziyama",
    category: "TikTok",
    year: "2024",
    format: "9:16",
    accent: "#22c55e",
    video: "/videos/fudzi.mp4",
    cover: "/images/covers/fudzi.webp",
    originalUrl: "https://www.tiktok.com/@sushifuji_global/video/7514661037933595926",
    viewCount: 1400000,
    description:
      "Food-ролик для Fudziyama: дегустация, реакции героев и аппетитные крупные планы для короткого формата.",
  },
  {
    title: "CubeMarket",
    category: "Shorts",
    year: "2026",
    format: "9:16",
    accent: "#ef4444",
    video: "/videos/CubeMarket.mp4",
    cover: "/images/covers/CubeMarket.webp",
    originalUrl: "https://www.youtube.com/shorts/Hkgow6vGYzc",
    viewCount: 7840,
    description:
      "Shorts для CubeMarket: знакомая тема, быстрые вставки и товарный акцент, который мягко ведёт к продукту.",
  },
  {
    title: "Anecole",
    category: "TikTok",
    year: "2026",
    format: "9:16",
    accent: "#8b5cf6",
    video: "/videos/Anecole.mp4",
    cover: "/images/covers/Anecole.webp",
    originalUrl: "https://www.tiktok.com/@simonyan_english/video/7645587507375361300?_r=1&_t=ZS-96qnbhhD3xM",
    viewCount: 288200,
    description:
      "Образовательный TikTok для Anecole: разбор английской речи, субтитры и вставки, которые делают урок живее.",
  },
  {
    title: "Алена Котлярова",
    category: "Reels",
    year: "2025",
    format: "9:16",
    accent: "#f59e0b",
    video: "/videos/Alena_dodo.mp4",
    cover: "/images/covers/Alena_dodo.webp",
    originalUrl: "https://www.instagram.com/alena_kots/reel/DSBBmC4iMTd/",
    viewCount: 1400,
    description:
      "Reels для Алёны Котляровой: обзор заведения, детали меню и живой тревел-формат для вовлечения аудитории.",
  },
];

const services = [
  {
    id: "01",
    marker: "S",
    title: "Короткие ролики",
    description: "Для Reels, Shorts, TikTok и рекламных вертикальных видео.",
    features: [
      "Сильное начало",
      "Читаемые субтитры",
      "Динамичные склейки",
      "Акценты на продукте",
      "Экспорт под площадки",
    ],
  },
  {
    id: "02",
    marker: "L",
    title: "Длинные видео",
    description: "Для YouTube, подкастов, интервью, обзоров и экспертного контента.",
    features: [
      "Структура выпуска",
      "Дополнительные кадры",
      "Плашки и подписи",
      "Чистка и баланс звука",
      "Логичная подача",
    ],
  },
  {
    id: "03",
    marker: "R",
    title: "Переупаковка контента",
    description: "Из длинной записи получается набор коротких роликов для разных площадок.",
    features: [
      "Выбор сильных фрагментов",
      "Нарезка коротких клипов",
      "Адаптация форматов",
      "Единый визуальный стиль",
      "Подготовка к публикации",
    ],
  },
];

const process = [
  {
    title: "Бриф",
    description: "Разбор задачи, исходников, площадки и цели ролика.",
  },
  {
    title: "Структура",
    description: "Логика ролика: начало, ключевые смыслы, темп и порядок сцен.",
  },
  {
    title: "Монтаж",
    description: "Ритм, титры, звук, графика и финальная сборка под выбранный формат.",
  },
  {
    title: "Сдача",
    description: "Готовые версии под нужные площадки и аккуратная работа с правками.",
  },
];

function ArrowLeftIcon({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

function ArrowUpIcon({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m18 15-6-6-6 6" />
    </svg>
  );
}

function BriefIcon({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 6h13" />
      <path d="M8 12h13" />
      <path d="M8 18h13" />
      <path d="M3 6h.01" />
      <path d="M3 12h.01" />
      <path d="M3 18h.01" />
    </svg>
  );
}

function ExternalLinkIcon({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

function MessageIcon({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
    </svg>
  );
}

function PlayIcon({ className = "" }) {
  return (
    <svg aria-hidden="true" className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function SendIcon({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

function XIcon({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function ButtonLink({ href, children, variant = "primary", newTab = false, icon: Icon = null, onClick }) {
  const baseClassName =
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-950";

  const variants = {
    primary: "bg-white text-neutral-950 hover:bg-neutral-200",
    secondary: "border border-white/20 bg-white/5 text-white hover:bg-white/10",
  };

  const className = `${baseClassName} ${variants[variant] || variants.primary}`;

  return (
    <a
      href={href}
      className={className}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noreferrer" : undefined}
      onClick={onClick}
    >
      {Icon && <Icon className="h-4 w-4 shrink-0" />}
      <span>{children}</span>
    </a>
  );
}

function getHoverPreviewPath(videoPath) {
  const fileName = videoPath?.split("/").pop();
  const baseName = fileName?.replace(/\.[^.]+$/, "");

  return baseName ? `/images/covers/${baseName}-hover.webp` : "";
}

function formatViewCount(viewCount) {
  if (typeof viewCount !== "number" || !Number.isFinite(viewCount) || viewCount <= 0) {
    return null;
  }

  const step =
    viewCount >= 1_000_000
      ? 100_000
      : viewCount >= 100_000
        ? 10_000
        : viewCount >= 1_000
          ? 1_000
          : 100;
  const roundedViewCount = Math.max(step, Math.ceil(viewCount / step) * step);

  if (roundedViewCount >= 1_000_000) {
    const millionLabel = (roundedViewCount / 1_000_000).toFixed(1).replace(".0", "");

    return `${millionLabel}млн`;
  }

  return roundedViewCount.toLocaleString("de-DE");
}

const hoverPreviewMediaQuery = "(hover: hover) and (pointer: fine)";

function ProjectPreview({ project, featured = false, canLoadHoverPreview = false }) {
  const videoRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isHoverPreviewVisible, setIsHoverPreviewVisible] = useState(false);
  const [isHoverPreviewRequested, setIsHoverPreviewRequested] = useState(false);
  const isVertical = project.format === "9:16";
  const hasVideo = Boolean(project.video);
  const shouldShowCover = hasVideo && !hasStarted;
  const hoverPreview = getHoverPreviewPath(project.video);
  const shouldRenderHoverPreview =
    canLoadHoverPreview && shouldShowCover && isHoverPreviewRequested && hoverPreview;
  const viewCountLabel = formatViewCount(project.viewCount);

  function handlePlay() {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.muted = false;
    video.volume = 1;
    setIsHoverPreviewVisible(false);
    setHasStarted(true);
    video.play().catch(() => setHasStarted(false));
  }

  return (
    <article
      className="project-card flex h-full flex-col overflow-hidden rounded-lg border border-white/10 bg-neutral-900"
      style={{ "--project-accent": project.accent }}
    >
      <div
        className="project-frame relative overflow-hidden bg-neutral-950"
        style={{ aspectRatio: isVertical ? "9 / 16" : "16 / 9" }}
      >
        <div className="project-accent-sheen pointer-events-none absolute inset-0 z-0" />
        <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {hasVideo ? (
          <video
            ref={videoRef}
            className="relative z-10 h-full w-full object-cover"
            src={project.video}
            autoPlay={false}
            muted={false}
            loop={isVertical}
            playsInline
            preload="none"
            controls={hasStarted}
          />
        ) : (
          <div
            className="relative z-10 h-full w-full"
            style={{
              background: `linear-gradient(135deg, ${project.accent}, #18181b 52%, #020617)`,
            }}
          />
        )}

        {shouldShowCover && (
          <button
            type="button"
            aria-label={`Смотреть ${project.title}`}
            className="group absolute inset-0 z-20 flex items-center justify-center bg-neutral-950 text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-950"
            onClick={handlePlay}
            onMouseEnter={() => {
              if (canLoadHoverPreview) {
                setIsHoverPreviewRequested(true);
                setIsHoverPreviewVisible(true);
              }
            }}
            onMouseLeave={() => setIsHoverPreviewVisible(false)}
          >
            {project.cover ? (
              <img
                src={project.cover}
                alt={`Обложка ${project.title}`}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]"
                loading="lazy"
              />
            ) : (
              <span
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${project.accent}, #18181b 52%, #020617)`,
                }}
              />
            )}
            {shouldRenderHoverPreview && (
              <img
                src={hoverPreview}
                alt=""
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-200 ${
                  isHoverPreviewVisible ? "opacity-100" : "opacity-0"
                }`}
                loading="lazy"
                aria-hidden="true"
              />
            )}
            <span className="absolute inset-0 bg-black/35 transition duration-500 group-hover:bg-black/20" />
            <span
              className="play-button relative flex h-16 w-16 items-center justify-center rounded-lg bg-white text-2xl text-neutral-950 shadow-xl transition duration-300 group-hover:scale-105"
            >
              <PlayIcon className="h-6 w-6" />
            </span>
          </button>
        )}

        {!hasVideo && !featured && (
          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-lg bg-white text-neutral-950 shadow-xl">
              <PlayIcon className="h-6 w-6" />
            </span>
          </div>
        )}
        <div className="pointer-events-none absolute left-4 top-4 z-30 flex flex-wrap gap-2">
          <span className="project-badge rounded-lg bg-white/90 px-3 py-1 text-xs font-bold text-neutral-950 backdrop-blur">
            {project.category}
          </span>
        </div>
      </div>

      <div className="project-meta flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-black text-white">{project.title}</h3>
          <span className="text-sm font-bold text-neutral-400">{project.year}</span>
        </div>
        {isVertical && (
          <div className="mt-4 inline-flex w-fit items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-neutral-300">
            <span className="text-neutral-500">Просмотры</span>
            <span className="text-white">{viewCountLabel || "уточняется"}</span>
          </div>
        )}
        <p className="mt-3 text-sm leading-6 text-neutral-300">{project.description}</p>
        {project.originalUrl && (
          <div className="mt-auto pt-5">
            <a
              href={project.originalUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/15 px-4 text-sm font-black text-white transition hover:bg-white/10"
            >
              <ExternalLinkIcon className="h-4 w-4 shrink-0" />
              <span>Смотреть полное видео</span>
            </a>
          </div>
        )}
      </div>
    </article>
  );
}

function buildBriefMessage(formData) {
  const getValue = (name) => formData.get(name)?.toString().trim() || "Не указано";

  return [
    "Новый бриф на монтаж",
    "",
    `Имя: ${getValue("name")}`,
    `Контакт: ${getValue("contact")}`,
    `Формат: ${getValue("format")}`,
    `Площадка: ${getValue("platform")}`,
    `Сроки: ${getValue("deadline")}`,
    "",
    `Задача: ${getValue("task")}`,
  ].join("\n");
}

function BriefModal({ isSending, onClose, onSubmit, status }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-5 py-8 backdrop-blur"
      onClick={onClose}
    >
      <div
        className="brief-modal-card max-h-full w-full max-w-3xl overflow-y-auto rounded-lg border border-white/10 bg-neutral-950 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-5 border-b border-white/10 p-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-neutral-500">
              Бриф на монтаж
            </p>
            <h2 className="mt-2 text-3xl font-black text-white md:text-4xl">
              Расскажите о задаче
            </h2>
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm font-bold text-neutral-300 transition hover:bg-white/10 hover:text-white"
            onClick={onClose}
          >
            <XIcon className="h-4 w-4 shrink-0" />
            <span>Закрыть</span>
          </button>
        </div>

        <form className="grid gap-5 p-6" onSubmit={onSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold text-neutral-200">
              Имя
              <input
                name="name"
                className="min-h-12 rounded-lg border border-white/10 bg-white/5 px-4 text-white outline-none transition focus:border-white/40"
                placeholder="Как к вам обращаться"
                required
              />
            </label>

            <label className="grid gap-2 text-sm font-bold text-neutral-200">
              Контакт
              <input
                name="contact"
                className="min-h-12 rounded-lg border border-white/10 bg-white/5 px-4 text-white outline-none transition focus:border-white/40"
                placeholder="Telegram, Instagram или телефон"
                required
              />
            </label>

            <label className="grid gap-2 text-sm font-bold text-neutral-200">
              Формат
              <span className="relative">
                <select
                  name="format"
                  className="min-h-12 w-full appearance-none rounded-lg border border-white/10 bg-neutral-900 pl-4 pr-12 text-white outline-none transition focus:border-white/40"
                >
                  <option>Reels / Shorts / TikTok</option>
                  <option>Горизонтальное 16:9</option>
                  <option>Нарезка из длинного видео</option>
                  <option>Реклама / промо</option>
                  <option>Пока не знаю</option>
                </select>
                <ArrowUpIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 rotate-180 text-neutral-300" />
              </span>
            </label>

            <label className="grid gap-2 text-sm font-bold text-neutral-200">
              Площадка
              <input
                name="platform"
                className="min-h-12 rounded-lg border border-white/10 bg-white/5 px-4 text-white outline-none transition focus:border-white/40"
                placeholder="YouTube, Instagram, TikTok..."
              />
            </label>

            <label className="grid gap-2 text-sm font-bold text-neutral-200">
              Сроки
              <input
                name="deadline"
                className="min-h-12 rounded-lg border border-white/10 bg-white/5 px-4 text-white outline-none transition focus:border-white/40"
                placeholder="Например: до пятницы"
              />
            </label>
          </div>

          <label className="grid gap-2 text-sm font-bold text-neutral-200">
            Задача
            <textarea
              name="task"
              className="min-h-32 resize-y rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-white/40"
              placeholder="Что нужно смонтировать, какая цель ролика, есть ли референсы?"
              required
            />
          </label>

          {status && <p className="text-sm font-medium text-neutral-300">{status}</p>}

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-black text-neutral-950 transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isSending}
            >
              <SendIcon className="h-4 w-4 shrink-0" />
              <span>{isSending ? "Отправляю..." : "Отправить бриф"}</span>
            </button>
            <button
              type="button"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/15 px-6 text-sm font-black text-white transition hover:bg-white/10"
              onClick={onClose}
            >
              <ArrowLeftIcon className="h-4 w-4 shrink-0" />
              <span>Закрыть форму</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function App() {
  const contactCardRef = useRef(null);
  const [isBriefOpen, setIsBriefOpen] = useState(false);
  const [isBriefSending, setIsBriefSending] = useState(false);
  const [briefStatus, setBriefStatus] = useState("");
  const [isScrollTopVisible, setIsScrollTopVisible] = useState(false);
  const [canLoadHoverPreviews, setCanLoadHoverPreviews] = useState(false);
  const verticalProjects = projects.filter((project) => project.format === "9:16");
  const horizontalProjects = projects.filter((project) => project.format === "16:9");

  useEffect(() => {
    const mediaQuery = window.matchMedia?.(hoverPreviewMediaQuery);

    if (!mediaQuery) {
      return undefined;
    }

    function updateHoverPreviewSupport() {
      setCanLoadHoverPreviews(mediaQuery.matches);
    }

    updateHoverPreviewSupport();
    mediaQuery.addEventListener("change", updateHoverPreviewSupport);

    return () => {
      mediaQuery.removeEventListener("change", updateHoverPreviewSupport);
    };
  }, []);

  useEffect(() => {
    function updateScrollTopVisibility() {
      setIsScrollTopVisible(window.scrollY > 520);
    }

    updateScrollTopVisibility();
    window.addEventListener("scroll", updateScrollTopVisibility, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrollTopVisibility);
    };
  }, []);

  function handleScrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleContactLinkClick(event) {
    event.preventDefault();

    const contactCard = contactCardRef.current;

    if (!contactCard) {
      return;
    }

    const headerHeight = document.querySelector("header")?.offsetHeight || 0;
    const topGap = 12;
    const targetTop = Math.max(
      0,
      window.scrollY + contactCard.getBoundingClientRect().top - headerHeight - topGap,
    );

    window.scrollTo({ top: targetTop, behavior: "smooth" });
  }

  async function handleBriefSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const message = buildBriefMessage(new FormData(form));

    setIsBriefSending(true);
    setBriefStatus("Отправляю бриф...");

    try {
      const response = await fetch("/api/brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: message }),
      });

      if (!response.ok) {
        throw new Error("Telegram request failed");
      }

      form.reset();
      setBriefStatus("Готово. Бриф отправлен в Telegram.");
    } catch (error) {
      console.error(error);
      setBriefStatus("Не получилось отправить бриф. Попробуйте ещё раз или напишите в Telegram.");
    } finally {
      setIsBriefSending(false);
    }
  }

  return (
    <div className="site-shell min-h-screen bg-neutral-950 text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/90 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
          <a href="#top" className="site-logo flex items-center gap-3 font-black tracking-tight">
            <span className="logo-mark flex h-10 w-10 items-center justify-center rounded-lg">
              <img
                src="/images/favicon.ico"
                alt=""
                className="h-full w-full object-cover"
                aria-hidden="true"
              />
            </span>
            <span>{profile.name}</span>
          </a>

          <div className="hidden items-center gap-5 text-sm text-neutral-300 md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-white">
                {item.label}
              </a>
            ))}
          </div>

          <ButtonLink href="#contact" icon={MessageIcon} onClick={handleContactLinkClick}>Обсудить проект</ButtonLink>
        </nav>
      </header>

      <main id="top">
        <section className="hero-section px-5 pb-8 pt-16 md:pb-10 md:pt-24">
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="reveal-surface">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-neutral-400">
                YouTube / Reels / Shorts / Реклама
              </p>
              <h1 className="mt-5 max-w-4xl text-5xl font-black leading-none tracking-tight sm:text-6xl lg:text-7xl">
                Монтаж, который удерживает внимание и помогает донести смысл.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-300">
                Из исходников получаются понятные YouTube-выпуски, Shorts, Reels и
                рекламные ролики для экспертов, брендов и авторов.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="#work" icon={PlayIcon}>Смотреть работы</ButtonLink>
                <ButtonLink
                  href="#contact"
                  variant="secondary"
                  icon={MessageIcon}
                  onClick={handleContactLinkClick}
                >
                  Связаться
                </ButtonLink>
              </div>

              <dl className="mt-10 grid max-w-xl grid-cols-3 gap-3">
                {[
                  ["40+", "проектов"],
                  ["5 лет", "опыта"],
                  ["24 ч", "на оценку проекта"],
                ].map(([value, label]) => (
                  <div key={label} className="stat-card rounded-lg border border-white/10 bg-white/5 p-4">
                    <dt className="text-2xl font-black">{value}</dt>
                    <dd className="mt-1 text-sm text-neutral-400">{label}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="portrait-card reveal-surface overflow-hidden rounded-lg bg-neutral-900">
              <img
                src={profile.avatar}
                alt={`${profile.name}, ${profile.role}`}
                className="aspect-square w-full object-cover object-[center_35%]"
              />
              <div className="border-t border-white/10 p-5">
                <p className="text-sm uppercase tracking-[0.18em] text-neutral-400">
                  {profile.role}
                </p>
                <h2 className="mt-2 text-3xl font-black">{profile.name}</h2>
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="scroll-mt-24 px-5 pb-8 pt-6 md:pb-10 md:pt-8">
          <div className="mx-auto max-w-7xl">
            <div>
              <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <h3 className="mt-2 text-3xl font-black md:text-4xl">Вертикальные видео</h3>
                </div>
                <p className="max-w-xl text-neutral-300">
                  Reels, Shorts и TikTok в формате 9:16 для мобильных площадок
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {verticalProjects.map((project) => (
                  <ProjectPreview
                    key={project.video || project.title}
                    project={project}
                    canLoadHoverPreview={canLoadHoverPreviews}
                  />
                ))}
              </div>
            </div>

            <div className="mt-16 md:mt-20">
              <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <h3 className="mt-2 text-3xl font-black md:text-4xl">Горизонтальные видео</h3>
                </div>
                <p className="max-w-xl text-neutral-300">
                  YouTube, рекламные ролики, презентационные видео и длинные выпуски
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                {horizontalProjects.map((project) => (
                  <ProjectPreview
                    key={project.video || project.title}
                    project={project}
                    canLoadHoverPreview={canLoadHoverPreviews}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="scroll-mt-24 px-5 pb-10 pt-6 md:pb-12 md:pt-8">
          <div className="mx-auto max-w-7xl">
            <div className="reveal-surface">
              <h2 className="max-w-4xl text-4xl font-black leading-tight md:text-6xl">
                Форматы работы
              </h2>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-300">
                Монтаж под регулярный контент, экспертные выпуски, рекламу и короткие
                ролики для соцсетей.
              </p>
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {services.map((service) => (
                <article
                  key={service.id}
                  className="service-card reveal-surface relative min-h-[28rem] overflow-hidden rounded-lg border border-white/10 bg-neutral-900 p-7 shadow-2xl shadow-black/20"
                >
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-white/10" />
                  <span className="absolute right-7 top-7 text-sm font-black text-white/70">
                    {service.id}
                  </span>

                  <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/15 bg-white text-lg font-black text-neutral-950">
                    {service.marker}
                  </div>

                  <h3 className="mt-12 text-2xl font-black text-white">{service.title}</h3>
                  <p className="mt-4 min-h-16 leading-7 text-neutral-300">
                    {service.description}
                  </p>

                  <ul className="mt-8 space-y-4">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex gap-3 text-sm leading-6 text-neutral-200">
                        <span className="mt-0.5 font-black text-white" aria-hidden="true">
                          ✓
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="scroll-mt-24 px-5 py-10 md:py-12">
          <div className="mx-auto max-w-7xl">
            <div className="reveal-surface mb-5 md:mb-6">
              <h2 className="text-4xl font-black md:text-5xl">Как строится работа?</h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {process.map((step, index) => (
                <div
                  key={step.title}
                  className="process-card reveal-surface rounded-lg border border-white/10 bg-neutral-900 p-5 shadow-xl shadow-black/10 md:p-6"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-black text-white/80">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px flex-1 bg-white/10" />
                  </div>
                  <h3 className="mt-6 text-2xl font-black text-white">{step.title}</h3>
                  <p className="mt-4 leading-7 text-neutral-300">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-24 px-5 pb-16 pt-8 md:pb-20 md:pt-10">
          <div
            ref={contactCardRef}
            className="contact-card reveal-surface mx-auto max-w-7xl overflow-hidden rounded-lg border border-white/10 bg-neutral-900 p-8 text-white shadow-2xl shadow-black/20 md:p-12"
          >
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <h2 className="max-w-4xl text-5xl font-black leading-none tracking-tight md:text-7xl">
                  Начнём с короткого брифа
                </h2>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85">
                  Расскажите, что нужно смонтировать, где будет публикация и какие
                  исходники уже есть. По брифу будет понятен формат, объём работы и
                  следующий шаг.
                </p>
              </div>

              <div className="w-full">
                <div className="grid gap-4">
                  {[
                    ["01", "Заполните короткий бриф"],
                    ["02", "Оценка задачи и формата"],
                    ["03", "Понятный план работы"],
                  ].map(([number, text]) => (
                    <div key={number} className="flex items-center gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-sm font-black text-neutral-950">
                        {number}
                      </span>
                      <span className="text-sm font-bold leading-6 text-white/90">{text}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t border-white/10 pt-6">
                  <p className="mb-4 text-sm leading-6 text-white/80">
                    Форма занимает пару минут и помогает быстро оценить задачу.
                  </p>
                  <div className="grid gap-3">
                    <button
                      type="button"
                      className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-black uppercase tracking-[0.12em] text-neutral-950 transition hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-900"
                      onClick={() => {
                        setBriefStatus("");
                        setIsBriefOpen(true);
                      }}
                    >
                      <BriefIcon className="h-4 w-4 shrink-0" />
                      <span>Заполнить бриф</span>
                    </button>
                    <a
                      href={profile.telegram}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border border-white/15 px-5 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-900"
                    >
                      <MessageIcon className="h-4 w-4 shrink-0" />
                      <span>Написать в Telegram</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {isBriefOpen && (
        <BriefModal
          isSending={isBriefSending}
          status={briefStatus}
          onClose={() => setIsBriefOpen(false)}
          onSubmit={handleBriefSubmit}
        />
      )}

      <button
        type="button"
        className={`scroll-top-button fixed bottom-5 right-5 z-[80] inline-flex h-12 w-12 items-center justify-center rounded-lg border border-white/15 bg-white text-neutral-950 shadow-2xl shadow-black/35 transition duration-300 hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-950 md:bottom-7 md:right-7 ${
          isScrollTopVisible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        }`}
        aria-label="Наверх"
        onClick={handleScrollToTop}
      >
        <ArrowUpIcon className="h-5 w-5" />
      </button>

      <footer className="border-t border-white/10 px-5 py-8 text-center text-sm text-neutral-500">
        © 2026 {profile.name}. All rights reserved.
      </footer>
    </div>
  );
}

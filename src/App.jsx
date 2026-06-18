import { useRef, useState } from "react";

const profile = {
  name: "Andrew Pavlenko",
  role: "Видеомонтажёр для экспертов, брендов и авторов",
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
    cover: "/images/covers/DS_codecs.jpg",
    description:
      "Подкаст DeepSchool «Под капотом»: разговор про видеокодеки, AI-модели и тимлидинг с аккуратной склейкой спикеров и брендированными перебивками.",
  },
  {
    title: "DeepSchool",
    category: "Разговорное",
    year: "2025",
    format: "16:9",
    accent: "#6366f1",
    video: "/videos/DS_15quest.mp4",
    cover: "/images/covers/DS_auto.jpg",
    description:
      "Формат «15 вопросов ML-инженеру» про автономный транспорт: talking-head, титры, именные плашки и спокойная экспертная подача.",
  },
  {
    title: "DeepSchool",
    category: "Интервью",
    year: "2026",
    format: "16:9",
    accent: "#0ea5e9",
    video: "/videos/DS_MOK.mp4",
    cover: "/images/covers/DS_MOK.jpg",
    description:
      "Мок-собеседование CV-инженера: созвон, разбор задачи про искусство, обучающие вставки и чистая структура интервью.",
  },
  {
    title: "KURS",
    category: "Обзор",
    year: "2025",
    format: "16:9",
    accent: "#f59e0b",
    video: "/videos/KURS_horizont.mp4",
    cover: "/images/covers/kurs_horizont.jpg",
    description:
      "Обзор девайсов KURS для бульдога: ведущий в военной стилистике, предметные крупные планы, детали креплений и динамичная демонстрация.",
  },
  {
    title: "KURS",
    category: "Shorts",
    year: "2025",
    format: "9:16",
    accent: "#14b8a6",
    video: "/videos/KURS_gangsters.mp4",
    description:
      "Вертикальная объяснялка KURS о том, почему гангстеры держат пистолеты под углом: ведущий, кино-вставки, титры и быстрый монтаж.",
  },
  {
    title: "KURS Animation",
    category: "Shorts",
    year: "2026",
    format: "9:16",
    accent: "#ec4899",
    video: "/videos/KURS_animation.mp4",
    description:
      "Анимационный short KURS про глубину бункера и разные калибры: рисованные схемы, понятная визуализация и темп образовательного Reels.",
  },
  {
    title: "A4Food",
    category: "Tiktok",
    year: "2026",
    format: "9:16",
    accent: "#eab308",
    video: "/videos/A4_drink.mp4",
    description:
      "A4Food-ролик с приготовлением напитка: блогерская подача, реакция героев, крупные планы ингредиентов и яркие субтитры.",
  },
   {
    title: "A4Food",
    category: "Tiktok",
    year: "2026",
    format: "9:16",
    accent: "#eab308",
    video: "/videos/A4_kvadrat.mp4",
    description:
      "A4Food-ролик про шоколадный квадрат: юмор с поваром, процесс приготовления, крупные планы и динамичная TikTok-подача.",
  },
  {
    title: "GGSel опросы",
    category: "Reels",
    year: "2026",
    format: "9:16",
    accent: "#38bdf8",
    video: "/videos/ggsel_opros.mp4",
    description:
      "Уличный опрос GGSel про выбор между деньгами и Steam: живые реакции, брендированные элементы, крупные планы и быстрые склейки.",
  },
  {
    title: "GGSel игровой",
    category: "Tiktok",
    year: "2026",
    format: "9:16",
    accent: "#22c55e",
    video: "/videos/ggsel_vicecity.mp4",
    description:
      "Игровой ролик GGSel со сравнением GTA San Andreas и Vice City: ведущая, геймплейные вставки, счёт и динамичные мемные акценты.",
  },
  {
    title: "BigCity недвижка",
    category: "Reels",
    year: "2024",
    format: "9:16",
    accent: "#9f22c5",
    video: "/videos/BigCity_kvartira.mp4",
    description:
      "Недвижимость BigCity: ролик про рассрочку от застройщиков, ипотеку и проценты с инфографикой, примерами квартир и продающим темпом.",
  },
  {
    title: "BigCity недвижка",
    category: "Reels",
    year: "2024",
    format: "9:16",
    accent: "#9f22c5",
    video: "/videos/BigCity_moscow.mp4",
    description:
      "BigCity о будущем Москвы: ведущий, архивные кадры, карта Нового Арбата и визуализация небоскрёба в коротком городском формате.",
  },
  {
    title: "Faina",
    category: "Reels",
    year: "2024",
    format: "9:16",
    accent: "#9f22c5",
    video: "/videos/faina.mp4",
    description:
      "Ролик Faina про изучение английского: сравнение Duolingo и Bamboo Bridge, ведущая, реакции ученицы и акцент на пользе продукта.",
  },
  {
    title: "MyCSGO",
    category: "Shorts",
    year: "2024",
    format: "9:16",
    accent: "#9f22c5",
    video: "/videos/MyCSGO.mp4",
    description:
      "MyCSGO short с открытием кейсов: ведущий, колесо выбора, скины CS и быстрые реакции под азартный игровой формат.",
  },
  {
    title: "MarketCSGO",
    category: "Shorts",
    year: "2024",
    format: "9:16",
    accent: "#9f22c5",
    video: "/videos/MarketCSGO.mp4",
    description:
      "MarketCSGO short про CS-граффити на Inferno: ведущий, игровые фрагменты, киберспортивные вставки и объясняющие титры.",
  },
  {
    title: "Fudziyama",
    category: "Reels",
    year: "2024",
    format: "9:16",
    accent: "#9f22c5",
    video: "/videos/fudzi.mp4",
    description:
      "Fudziyama food-ролик с дегустацией азиатских блюд: острый соус, креветка темпура, реакции героев и сочные крупные планы.",
  },
  {
    title: "CubeMarket",
    category: "Reels",
    year: "2026",
    format: "9:16",
    accent: "#9f22c5",
    video: "/videos/CubeMarket.mp4",
    description:
      "CubeMarket-ролик про мультфильм «Тачки»: нарезка Pixar, ведущий с игрушками, коллекционные машинки и товарный акцент.",
  },
  {
    title: "Anecole",
    category: "Tiktok",
    year: "2026",
    format: "9:16",
    accent: "#9f22c5",
    video: "/videos/Anecole.mp4",
    description:
      "Anecole short про английский знаменитостей: разбор речи Владимира Познера, субтитры, вставки интервью и образовательный темп.",
  },
  {
    title: "Алена Котлярова",
    category: "Reels",
    year: "2025",
    format: "9:16",
    accent: "#9f22c5",
    video: "/videos/Alena_dodo.mp4",
    description:
      "Reels Алены Котляровой про китайскую Dodo Pizza: обзор меню, атмосфера заведения, детали упаковки и живой тревел-репортаж.",
  },
];

const services = [
  {
    id: "01",
    marker: "S",
    title: "Short-form монтаж",
    description: "Для Reels, Shorts, TikTok и рекламных вертикальных роликов.",
    features: [
      "Хук в первые секунды",
      "Читаемые субтитры",
      "Динамичные склейки",
      "Визуальные акценты",
      "Экспорт под площадки",
    ],
  },
  {
    id: "02",
    marker: "L",
    title: "Long-form видео",
    description: "Для YouTube, подкастов, интервью, обзоров и экспертных выпусков.",
    features: [
      "Структура выпуска",
      "B-roll и перебивки",
      "Lower thirds и плашки",
      "Чистка и баланс звука",
      "Цельная подача",
    ],
  },
  {
    id: "03",
    marker: "R",
    title: "Переупаковка контента",
    description: "Из длинной записи собираю набор коротких материалов для разных платформ.",
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
  "Разбираю исходники, задачу и площадку публикации.",
  "Собираю структуру: хук, смысловые блоки, темп и акценты.",
  "Делаю чистовой монтаж, звук, титры и финальный экспорт.",
];

function PlayIcon({ className = "" }) {
  return (
    <span aria-hidden="true" className={`inline-block ${className}`}>
      ▶
    </span>
  );
}

function ButtonLink({ href, children, variant = "primary", newTab = false }) {
  const baseClassName =
    "inline-flex min-h-11 items-center justify-center rounded-lg px-5 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-950";

  const variants = {
    primary: "bg-white text-neutral-950 hover:bg-neutral-200",
    secondary: "border border-white/20 bg-white/5 text-white hover:bg-white/10",
    instagram:
      "bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white hover:brightness-110",
    telegram: "bg-[#229ed9] text-white hover:bg-[#1d8fc4]",
  };

  const className = `${baseClassName} ${variants[variant] || variants.primary}`;

  return (
    <a
      href={href}
      className={className}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

function ProjectPreview({ project, featured = false }) {
  const videoRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);
  const isVertical = project.format === "9:16";
  const isHorizontal = !isVertical;
  const hasVideo = Boolean(project.video);
  const shouldShowCover = hasVideo && isHorizontal && !hasStarted;

  function handleHorizontalPlay() {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.muted = false;
    video.volume = 1;
    setHasStarted(true);
    video.play().catch(() => setHasStarted(false));
  }

  return (
    <article className="overflow-hidden rounded-lg border border-white/10 bg-neutral-900">
      <div
        className="relative overflow-hidden bg-neutral-950"
        style={{ aspectRatio: isVertical ? "9 / 16" : "16 / 9" }}
      >
        {hasVideo ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src={project.video}
            autoPlay={isVertical}
            muted={isVertical}
            loop={isVertical}
            playsInline
            preload="metadata"
            controls={isVertical || hasStarted}
          />
        ) : (
          <div
            className="h-full w-full"
            style={{
              background: `linear-gradient(135deg, ${project.accent}, #18181b 52%, #020617)`,
            }}
          />
        )}

        {shouldShowCover && (
          <button
            type="button"
            aria-label={`Смотреть ${project.title}`}
            className="absolute inset-0 z-10 flex items-center justify-center bg-neutral-950 text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-950"
            onClick={handleHorizontalPlay}
          >
            {project.cover ? (
              <img
                src={project.cover}
                alt={`Обложка ${project.title}`}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <span
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${project.accent}, #18181b 52%, #020617)`,
                }}
              />
            )}
            <span className="absolute inset-0 bg-black/35" />
            <span className="relative flex h-16 w-16 items-center justify-center rounded-lg bg-white text-2xl text-neutral-950 shadow-xl transition hover:scale-105">
              <PlayIcon />
            </span>
          </button>
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        {!hasVideo && !featured && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-lg bg-white text-neutral-950 shadow-xl">
              <PlayIcon />
            </span>
          </div>
        )}
        <div className="pointer-events-none absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="rounded-lg bg-black/60 px-3 py-1 text-xs font-bold text-white backdrop-blur">
            {project.category}
          </span>
          <span className="rounded-lg bg-white px-3 py-1 text-xs font-bold text-neutral-950">
            {project.format}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-black text-white">{project.title}</h3>
          <span className="text-sm font-bold text-neutral-400">{project.year}</span>
        </div>
        <p className="mt-3 text-sm leading-6 text-neutral-300">{project.description}</p>
      </div>
    </article>
  );
}

export default function App() {
  const verticalProjects = projects.filter((project) => project.format === "9:16");
  const horizontalProjects = projects.filter((project) => project.format === "16:9");

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/90 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
          <a href="#top" className="flex items-center gap-3 font-black tracking-tight">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-neutral-950">
              <PlayIcon className="text-sm" />
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

          <ButtonLink href="#contact">Обсудить проект</ButtonLink>
        </nav>
      </header>

      <main id="top">
        <section className="px-5 py-16 md:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-neutral-400">
                Video editor / talking-head / brand content
              </p>
              <h1 className="mt-5 max-w-4xl text-5xl font-black leading-none tracking-tight sm:text-6xl lg:text-7xl">
                Монтаж, который держит внимание и усиливает смысл.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-300">
                Превращаю сырой материал в понятные YouTube-выпуски, Reels, Shorts,
                рекламные ролики и шоурилы для экспертов, авторов и команд.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="#work">Смотреть работы</ButtonLink>
                <ButtonLink href="#contact" variant="secondary">
                  Написать
                </ButtonLink>
              </div>

              <dl className="mt-10 grid max-w-xl grid-cols-3 gap-3">
                {[
                  ["40+", "проектов"],
                  ["5 лет", "опыта"],
                  ["24 ч", "на первый ответ"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <dt className="text-2xl font-black">{value}</dt>
                    <dd className="mt-1 text-sm text-neutral-400">{label}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="overflow-hidden rounded-lg border border-white/10 bg-neutral-900">
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

        <section id="work" className="border-y border-white/10 bg-white/[0.03] px-5 py-16">
          <div className="mx-auto max-w-7xl">
            <div>
              <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-neutral-500">
                    Работы
                  </p>
                  <h3 className="mt-2 text-3xl font-black md:text-4xl">Вертикальные видео</h3>
                </div>
                <p className="max-w-xl text-neutral-300">
                  Reels, Shorts и TikTok в формате 9:16 для мобильных площадок
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {verticalProjects.map((project) => (
                  <ProjectPreview key={project.video || project.title} project={project} />
                ))}
              </div>
            </div>

            <div className="mt-24 md:mt-32">
              <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <h3 className="mt-2 text-3xl font-black md:text-4xl">Горизонтальные видео</h3>
                </div>
                <p className="max-w-xl text-neutral-300">
                  YouTube, рекламные ролики, презентационные видео и long-form в формате 16:9
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                {horizontalProjects.map((project) => (
                  <ProjectPreview key={project.video || project.title} project={project} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="px-5 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[0.35fr_1fr] lg:items-start">
              <div className="flex items-center gap-4 pt-3 text-xs font-black uppercase tracking-[0.28em] text-neutral-500">
                <span>Услуги</span>
              </div>

              <div>
                <h2 className="max-w-4xl text-4xl font-black leading-tight md:text-6xl">
                  С чем я могу помочь?
                </h2>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-300">
                  Понятные форматы работы для экспертов, брендов и авторов, которым нужен
                  регулярный контент без случайного монтажа
                </p>
              </div>
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {services.map((service) => (
                <article
                  key={service.id}
                  className="relative min-h-[28rem] overflow-hidden rounded-lg border border-white/10 bg-neutral-900 p-7 shadow-2xl shadow-black/20"
                >
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-white/10" />
                  <span className="absolute right-7 top-7 text-sm font-black text-neutral-400">
                    {service.id}
                  </span>

                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white text-lg font-black text-neutral-950">
                    {service.marker}
                  </div>

                  <h3 className="mt-12 text-2xl font-black text-white">{service.title}</h3>
                  <p className="mt-4 min-h-16 leading-7 text-neutral-300">
                    {service.description}
                  </p>

                  <ul className="mt-8 space-y-4">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex gap-3 text-sm leading-6 text-neutral-200">
                        <span className="mt-0.5 font-black text-red-400" aria-hidden="true">
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

        <section id="process" className="px-5 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-neutral-500">
                Процесс
              </p>
              <h2 className="mt-3 text-4xl font-black md:text-5xl">Как строится работа?</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {process.map((step, index) => (
                <div key={step} className="rounded-lg border border-white/10 bg-neutral-900 p-6">
                  <span className="text-sm font-black text-neutral-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-4 leading-7 text-neutral-200">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="px-5 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-neutral-500">
              Контакты
            </p>
            <h2 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
              Есть материал? Соберём из него сильное видео.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl leading-7 text-neutral-300">
              Напишите, какой формат нужен, где будет публикация и какие исходники уже есть
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              {/* <ButtonLink href={`mailto:${profile.email}`}>{profile.email}</ButtonLink> */}
              <ButtonLink href={profile.instagram} variant="instagram" newTab>
                Instagram
              </ButtonLink>
              <ButtonLink href={profile.telegram} variant="telegram" newTab>
                Telegram
              </ButtonLink>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-5 py-8 text-center text-sm text-neutral-500">
        © 2026 {profile.name}. All rights reserved.
      </footer>
    </div>
  );
}

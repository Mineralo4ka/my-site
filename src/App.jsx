const profile = {
  name: "Andrew Pavlenko",
  role: "Видеомонтажёр для экспертов, брендов и авторов",
  email: "yourmail@example.com",
  instagram: "#",
  telegram: "#",
  avatar: "/images/avatar.jpg",
};

const navItems = [
  { href: "#showreel", label: "Шоурил" },
  { href: "#work", label: "Работы" },
  { href: "#services", label: "Услуги" },
  { href: "#process", label: "Процесс" },
  { href: "#contact", label: "Контакты" },
];

const projects = [
  {
    title: "Expert Talking Head",
    category: "YouTube",
    year: "2026",
    format: "16:9",
    accent: "#f97316",
    video: "/videos/sos.mp4",
    description:
      "Длинный выпуск с чистой структурой, динамичным b-roll, титрами и аккуратным саунд-дизайном.",
  },
  {
    title: "Commercial Reel",
    category: "Реклама",
    year: "2026",
    format: "16:9",
    accent: "#14b8a6",
    description:
      "Короткий коммерческий ролик с акцентом на продукт, темп, оффер и ясный визуальный ритм.",
  },
  {
    title: "Podcast Shorts",
    category: "Shorts",
    year: "2026",
    format: "9:16",
    accent: "#ec4899",
    description:
      "Вертикальные нарезки из подкаста: сильный хук, субтитры, удержание и понятная мысль.",
  },
  {
    title: "Event Aftermovie",
    category: "Ивент",
    year: "2025",
    format: "16:9",
    accent: "#eab308",
    description:
      "Атмосферный aftermovie с живой динамикой, музыкальными акцентами и цельной историей.",
  },
  {
    title: "Creator Reels",
    category: "Reels",
    year: "2026",
    format: "9:16",
    accent: "#38bdf8",
    description:
      "Серии коротких роликов для личного бренда: быстрый монтаж, титры и плотная подача.",
  },
  {
    title: "Education Cut",
    category: "Обучение",
    year: "2025",
    format: "16:9",
    accent: "#22c55e",
    description:
      "Монтаж обучающих материалов, где важны логика, спокойный темп и отсутствие визуального шума.",
  },
];

const services = [
  "Монтаж YouTube-выпусков и экспертных видео",
  "Reels, Shorts и TikTok из длинного материала",
  "Субтитры, титры и простая motion-графика",
  "Саунд-дизайн, чистка звука и подбор музыки",
  "Цветокоррекция и финальная подготовка к публикации",
  "Шоурилы, презентационные и рекламные ролики",
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

function ButtonLink({ href, children, variant = "primary" }) {
  const className =
    variant === "primary"
      ? "inline-flex min-h-11 items-center justify-center rounded-lg bg-white px-5 text-sm font-bold text-neutral-950 transition hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-950"
      : "inline-flex min-h-11 items-center justify-center rounded-lg border border-white/20 bg-white/5 px-5 text-sm font-bold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-950";

  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

function ProjectPreview({ project, featured = false }) {
  const isVertical = project.format === "9:16";
  const hasVideo = Boolean(project.video);

  return (
    <article className="overflow-hidden rounded-lg border border-white/10 bg-neutral-900">
      <div
        className="relative overflow-hidden bg-neutral-950"
        style={{ aspectRatio: isVertical ? "9 / 16" : "16 / 9" }}
      >
        {hasVideo ? (
          <video
            className="h-full w-full object-cover"
            src={project.video}
            muted
            loop
            playsInline
            preload={featured ? "metadata" : "none"}
            controls={featured}
          />
        ) : (
          <div
            className="h-full w-full"
            style={{
              background: `linear-gradient(135deg, ${project.accent}, #18181b 52%, #020617)`,
            }}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10" />
        {!featured && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-lg bg-white text-neutral-950 shadow-xl">
              <PlayIcon />
            </span>
          </div>
        )}
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
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
  const featuredProject = projects[0];

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
                  ["50+", "проектов"],
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
                className="aspect-[4/5] w-full object-cover"
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

        <section id="showreel" className="px-5 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-neutral-500">
                  Showreel
                </p>
                <h2 className="mt-3 text-4xl font-black md:text-5xl">Ключевой ролик</h2>
              </div>
              <p className="max-w-xl text-neutral-300">
                На первом экране шоурила используется локальное видео из проекта, без
                внешних демо-ссылок и лишней сетевой зависимости.
              </p>
            </div>
            <ProjectPreview project={featuredProject} featured />
          </div>
        </section>

        <section id="work" className="border-y border-white/10 bg-white/[0.03] px-5 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-neutral-500">
                Portfolio
              </p>
              <h2 className="mt-3 text-4xl font-black md:text-5xl">Форматы работ</h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {projects.slice(1).map((project) => (
                <ProjectPreview key={project.title} project={project} />
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="px-5 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-neutral-500">
                  Services
                </p>
                <h2 className="mt-3 text-4xl font-black md:text-5xl">Что можно заказать</h2>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {services.map((service) => (
                  <div key={service} className="rounded-lg border border-white/10 bg-white/5 p-5">
                    <span className="text-sm font-medium leading-6 text-neutral-100">
                      {service}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="process" className="px-5 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-neutral-500">
                Process
              </p>
              <h2 className="mt-3 text-4xl font-black md:text-5xl">Как строится работа</h2>
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
              Contact
            </p>
            <h2 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
              Есть материал? Соберём из него сильное видео.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl leading-7 text-neutral-300">
              Напишите, какой формат нужен, где будет публикация и какие исходники уже есть.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href={`mailto:${profile.email}`}>{profile.email}</ButtonLink>
              <ButtonLink href={profile.instagram} variant="secondary">
                Instagram
              </ButtonLink>
              <ButtonLink href={profile.telegram} variant="secondary">
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

import DefensiveImage from "@/components/DefensiveImage";
import { ProductProps, ProfessionalProps, StudioProps } from "@/types";
import {
  calculateRating,
  constants,
  formatPrice,
  skillsTranslations,
} from "@/utils/utils";
import Link from "next/link";
import { IconType } from "react-icons";
import {
  FaCamera,
  FaDownload,
  FaGlobeAmericas,
  FaPhone,
  FaStar,
} from "react-icons/fa";
import {
  MdArrowOutward,
  MdEmail,
  MdLocationPin,
  MdPiano,
} from "react-icons/md";
import HomeSection from "./HomeSection";
import {
  buildSheetMusicPreviewHref,
  HomeDashboardData,
  HomePhoto,
  HomeQuickLink,
} from "./home-data";

const quickLinkIcons: Record<string, IconType> = {
  [constants.INSTRUMENTS_PATH]: MdPiano,
  [constants.PICTURES_2025_PATH]: FaCamera,
  [constants.PROFESSIONALS_PATH]: FaStar,
  [constants.SHEETMUSIC_PATH]: FaDownload,
  [constants.STUDIOS_PATH]: FaGlobeAmericas,
};

function getProductImage(product: ProductProps) {
  const productImages = product.images as string[] | undefined;
  return productImages?.[0] ?? product.pictures?.[0];
}

function formatProductPrice(product: ProductProps) {
  if (!product.price) {
    return "Consultar";
  }

  return product.listingType === constants.RENT
    ? `${formatPrice(product.price)} / día`
    : formatPrice(product.price);
}

function formatPublicationDate(createdAt?: string) {
  if (!createdAt) {
    return "";
  }

  const publishedAt = new Date(createdAt);

  if (Number.isNaN(publishedAt.getTime())) {
    return "";
  }

  return `Publicado el ${new Intl.DateTimeFormat("es-AR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(publishedAt)}`;
}

function getSheetMusicName(composer?: string, title?: string) {
  if (composer && title) {
    return `${composer} - ${title}`;
  }

  return composer ?? title ?? "Partitura";
}

function EmptyPreview({
  ctaHref,
  ctaLabel,
  message,
}: {
  ctaHref: string;
  ctaLabel: string;
  message: string;
}) {
  return (
    <div className="dashboard-card flex min-h-[220px] flex-col items-start justify-between gap-4 p-6">
      <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
        {message}
      </p>
      <Link
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100"
        href={ctaHref}
      >
        {ctaLabel}
        <MdArrowOutward className="text-lg" />
      </Link>
    </div>
  );
}

function QuickLinkCard({
  isLoggedIn,
  quickLink,
}: {
  isLoggedIn: boolean;
  quickLink: HomeQuickLink;
}) {
  const Icon = quickLinkIcons[quickLink.href] ?? MdPiano;

  return (
    <Link
      className="dashboard-link-card group flex h-full flex-col justify-between gap-5 p-5"
      href={quickLink.href}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold tracking-tight">
            {quickLink.title}
          </h3>
        </div>
        <span className="dashboard-chip rounded-2xl px-3 py-2">
          <Icon className="text-lg" />
        </span>
      </div>

      <div className="space-y-4">
        <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
          {quickLink.description}
        </p>
        <div className="flex items-center justify-between gap-3 text-sm font-semibold text-slate-800 dark:text-slate-100">
          <span>Ver sección</span>
          {quickLink.requiresLogin && !isLoggedIn ? (
            <span className="dashboard-chip">Requiere sesión</span>
          ) : (
            <MdArrowOutward className="text-lg transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          )}
        </div>
      </div>
    </Link>
  );
}

function ProductPreviewCard({
  isOwn,
  product,
}: {
  isOwn: boolean;
  product: ProductProps;
}) {
  return (
    <Link
      className="dashboard-card group block overflow-hidden p-4"
      href={
        product._id
          ? `${constants.INSTRUMENTS_PATH}/${product._id}`
          : constants.INSTRUMENTS_PATH
      }
    >
      <div className="relative h-48 overflow-hidden rounded-2xl bg-white/80 dark:bg-slate-950/60">
        <DefensiveImage
          alt={product.title ?? "Instrumento publicado en Tecladistas"}
          className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
          src={getProductImage(product)}
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {isOwn ? (
            <span className="dashboard-chip">Tu publicación</span>
          ) : null}
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <h3 className="line-clamp-2 text-lg font-semibold tracking-tight">
              {product.title ?? `${product.brand ?? ""} ${product.model ?? ""}`}
            </h3>
            {product.location ? (
              <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-300">
                <MdLocationPin className="text-base" />
                <span>{product.location}</span>
              </div>
            ) : null}
          </div>
          <p className="text-right text-sm font-semibold text-emerald-700 dark:text-emerald-300">
            {formatProductPrice(product)}
          </p>
        </div>

        <div className="flex items-center justify-between gap-3 text-sm text-slate-600 dark:text-slate-300">
          <span>{formatPublicationDate(product.createdAt)}</span>
          {product.exchanges ? (
            <span className="dashboard-chip">Escucha canjes</span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}

function ProfessionalPreviewCard({
  professional,
}: {
  professional: ProfessionalProps;
}) {
  const rating = calculateRating(professional.ratings);
  const visibleSkills = professional.skills
    .slice(0, 2)
    .map((skill) => skillsTranslations[skill] ?? skill);

  return (
    <Link
      className="dashboard-card group flex h-full flex-col justify-between gap-4 p-5"
      href={`${constants.PROFESSIONALS_PATH}/${professional._id}`}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold tracking-tight">
              {professional.firstName}{" "}
              {professional.nickname ? `"${professional.nickname}"` : ""}{" "}
              {professional.lastName ?? ""}
            </h3>
            {professional.location ? (
              <div className="mt-1 flex items-center gap-1 text-sm text-slate-600 dark:text-slate-300">
                <MdLocationPin className="text-base" />
                <span>{professional.location}</span>
              </div>
            ) : null}
          </div>

          {professional.ratings?.length ? (
            <div className="dashboard-chip flex items-center gap-1">
              <span>{rating}</span>
              <FaStar className="text-sm" />
            </div>
          ) : null}
        </div>

        {visibleSkills.length ? (
          <div className="flex flex-wrap gap-2">
            {visibleSkills.map((skill) => (
              <span className="dashboard-chip" key={skill}>
                {skill}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-3 text-base text-slate-600 dark:text-slate-300">
        {professional.isTecladista ? <MdPiano /> : null}
        {professional.phone ? <FaPhone /> : null}
        {professional.email ? <MdEmail /> : null}
        {professional.website ? <FaGlobeAmericas /> : null}
      </div>
    </Link>
  );
}

function StudioPreviewCard({ studio }: { studio: StudioProps }) {
  return (
    <Link
      className="dashboard-card group block overflow-hidden p-4"
      href={`${constants.STUDIOS_PATH}/${studio._id}`}
    >
      <div className="relative h-52 overflow-hidden rounded-2xl bg-white/80 dark:bg-slate-950/60">
        <DefensiveImage
          alt={`Imagen principal del estudio ${studio.name}`}
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          src={studio.images?.[0]}
        />
      </div>

      <div className="mt-4 space-y-3">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight">
            {studio.name}
          </h3>
          {studio.location ? (
            <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-300">
              <MdLocationPin className="text-base" />
              <span>{studio.location}</span>
            </div>
          ) : null}
        </div>

        {studio.services?.length ? (
          <div className="flex flex-wrap gap-2">
            {studio.services.slice(0, 3).map((service) => (
              <span className="dashboard-chip" key={service}>
                {service}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </Link>
  );
}

function PhotosPreview({
  photo,
  photosYear,
}: {
  photo: HomePhoto;
  photosYear: string;
}) {
  return (
    <Link
      className="group relative block h-40 overflow-hidden rounded-2xl"
      href={constants.PICTURES_2025_PATH}
    >
      <DefensiveImage
        alt={photo.originalAlt ?? `Foto del encuentro ${photosYear}`}
        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        fill
        sizes="(max-width: 768px) 50vw, 33vw"
        src={photo.thumbnail ?? photo.original}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80" />
    </Link>
  );
}

export default function HomeDashboard({
  featuredProfessionals,
  featuredStudios,
  isLoggedIn,
  memberCountLabel,
  photos,
  photosYear,
  productsForRent,
  productsForSale,
  quickLinks,
  sessionUserId,
  stats,
  topSheetMusic,
  topSkills,
}: HomeDashboardData) {
  const heroImage = photos[0]?.original ?? "/keyboard.jpg";

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
      <section className="grid gap-6 lg:grid-cols-2">
        {" "}
        <div className="dashboard-panel p-6 sm:p-8 lg:p-10">
          <div className="flex h-full flex-col justify-between gap-8">
            <div className="space-y-5">
              <p className="dashboard-eyebrow">Bienvenidx</p>
              <div className="space-y-4">
                <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
                  <span className="text-emerald-700 dark:text-emerald-300">
                    Tecladistas Gitanxs
                  </span>
                  : instrumentos, técnicos, estudios, fotos y partituras.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
                  Aquí podés consultar el listado actualizado de contactos de
                  técnicos de distintas áreas como transportistas y afinadores.
                  Además, podés publicar tu estudio de grabación y tus
                  instrumentos en venta y alquiler.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard-panel overflow-hidden p-0">
          <div className="relative min-h-[320px] overflow-hidden lg:min-h-full">
            <DefensiveImage
              alt="Resumen visual de la comunidad Tecladistas"
              className="object-cover"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              src={heroImage}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-6 text-white sm:p-8">
              <div>
                <p className="dashboard-eyebrow text-white/70">Resumen</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                  Una comunidad de {memberCountLabel} tecladistas
                </h2>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/70">
                    Instrumentos
                  </p>
                  <p className="mt-2 text-xl font-semibold">
                    {quickLinks[0]?.metric ?? "Instrumentos"}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/70">
                    Técnicos
                  </p>
                  <p className="mt-2 text-xl font-semibold">
                    {quickLinks[1]?.metric ?? "Profesionales"}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/70">
                    Partituras
                  </p>
                  <p className="mt-2 text-xl font-semibold">
                    {quickLinks[4]?.metric ?? "Partituras"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map((stat) => (
          <div className="dashboard-panel p-5" key={stat.label}>
            <p className="dashboard-eyebrow">{stat.label}</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight">
              {stat.value}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {stat.detail}
            </p>
          </div>
        ))}
      </section>

      <HomeSection description="" eyebrow="Mapa rápido" title="Explorá la web">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {quickLinks.map((quickLink) => (
            <QuickLinkCard
              isLoggedIn={isLoggedIn}
              key={quickLink.href}
              quickLink={quickLink}
            />
          ))}
        </div>
      </HomeSection>

      <HomeSection
        description=""
        eyebrow="Compra / Venta"
        href={constants.INSTRUMENTS_PATH}
        linkLabel="Ver todo"
        title="Instrumentos recientes"
      >
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="dashboard-card p-5">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <p className="dashboard-eyebrow">Venta</p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight">
                  Listados activos
                </h3>
              </div>
              <span className="dashboard-chip">
                {productsForSale.length} visibles
              </span>
            </div>

            {productsForSale.length ? (
              <div className="grid gap-4 md:grid-cols-2">
                {productsForSale.map((product) => (
                  <ProductPreviewCard
                    isOwn={product.userId === sessionUserId}
                    key={product._id ?? product.title}
                    product={product}
                  />
                ))}
              </div>
            ) : (
              <EmptyPreview
                ctaHref={constants.INSTRUMENTS_PATH}
                ctaLabel="Ver instrumentos"
                message="Todavía no pude cargar publicaciones de venta para este resumen."
              />
            )}
          </div>

          <div className="dashboard-card p-5">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <p className="dashboard-eyebrow">Alquiler</p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight">
                  Opciones por día
                </h3>
              </div>
              <span className="dashboard-chip">
                {productsForRent.length} visibles
              </span>
            </div>

            {productsForRent.length ? (
              <div className="grid gap-4 md:grid-cols-2">
                {productsForRent.map((product) => (
                  <ProductPreviewCard
                    isOwn={product.userId === sessionUserId}
                    key={product._id ?? product.title}
                    product={product}
                  />
                ))}
              </div>
            ) : (
              <EmptyPreview
                ctaHref={`${constants.INSTRUMENTS_PATH}#alquiler`}
                ctaLabel="Explorar alquileres"
                message="No encontré alquileres listos para mostrar en el recorte actual."
              />
            )}
          </div>
        </div>
      </HomeSection>

      <HomeSection
        description=""
        eyebrow="Técnicos"
        href={constants.PROFESSIONALS_PATH}
        linkLabel="Ver profesionales"
        title="Profesionales destacados"
      >
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {topSkills.map((skill) => (
              <span className="dashboard-chip" key={skill.key}>
                {skill.label} · {skill.count}
              </span>
            ))}
          </div>

          {featuredProfessionals.length ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {featuredProfessionals.map((professional) => (
                <ProfessionalPreviewCard
                  key={professional._id}
                  professional={professional}
                />
              ))}
            </div>
          ) : (
            <EmptyPreview
              ctaHref={constants.PROFESSIONALS_PATH}
              ctaLabel="Abrir profesionales"
              message="El resumen no pudo cargar contactos destacados, pero la sección completa sigue disponible."
            />
          )}
        </div>
      </HomeSection>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
        <HomeSection
          description=""
          eyebrow="Producción"
          href={constants.STUDIOS_PATH}
          linkLabel="Ver estudios"
          title="Estudios en foco"
        >
          {featuredStudios.length ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {featuredStudios.map((studio) => (
                <StudioPreviewCard key={studio._id} studio={studio} />
              ))}
            </div>
          ) : (
            <EmptyPreview
              ctaHref={constants.STUDIOS_PATH}
              ctaLabel="Explorar estudios"
              message="No pude cargar estudios para este preview; la sección completa sigue disponible."
            />
          )}
        </HomeSection>

        <HomeSection
          description=""
          eyebrow="Recursos"
          href={constants.SHEETMUSIC_PATH}
          linkLabel="Ver catálogo"
          title="Partituras más descargadas"
        >
          {topSheetMusic.length ? (
            <div className="flex flex-col gap-3">
              {topSheetMusic.map((sheet) => (
                <Link
                  className="dashboard-link-card flex items-center justify-between gap-4 p-4"
                  href={buildSheetMusicPreviewHref(sheet)}
                  key={sheet.id}
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold leading-6">
                      {getSheetMusicName(sheet.composer, sheet.title)}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {sheet.genre ?? "Género abierto"}
                      {sheet.difficulty ? ` · ${sheet.difficulty}` : ""}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="dashboard-eyebrow">Descargas</p>
                    <p className="mt-1 text-lg font-semibold">
                      {sheet.downloadCount}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <EmptyPreview
              ctaHref={constants.SHEETMUSIC_PATH}
              ctaLabel="Ver partituras"
              message="No hubo datos suficientes para construir el ranking de descargas."
            />
          )}
        </HomeSection>
      </div>

      <HomeSection
        description=""
        eyebrow="Galería"
        href={constants.PICTURES_2025_PATH}
        linkLabel="Ver fotos"
        title={`Fotos ${photosYear}`}
      >
        {photos.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((photo) => (
              <PhotosPreview
                key={photo.original}
                photo={photo}
                photosYear={photosYear}
              />
            ))}
          </div>
        ) : (
          <Link
            className="dashboard-link-card block overflow-hidden p-0"
            href={constants.PICTURES_2025_PATH}
          >
            <div className="relative h-64">
              <DefensiveImage
                alt="Teclado de piano o sintetizador"
                className="object-cover"
                fill
                sizes="100vw"
                src="/keyboard.jpg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="dashboard-eyebrow text-white/70">Acceso rápido</p>
                <h3 className="mt-2 text-2xl font-semibold">
                  Ver el archivo visual del grupo
                </h3>
              </div>
            </div>
          </Link>
        )}
      </HomeSection>

      <HomeSection
        description=""
        eyebrow="Comunidad"
        title="Sobre Tecladistas Gitanxs"
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
          <div className="dashboard-card space-y-4 p-6 text-sm leading-7 text-slate-700 dark:text-slate-200">
            <p>
              Tecladistas Gitanxs nacio en 2013 entre amigxs que compartian la
              pasion por pianos y teclados. Desde entonces el grupo se fue
              ampliando por recomendacion, encuentros y trabajo en comun.
            </p>
            <p>
              Hoy la comunidad cuenta con {memberCountLabel} integrantes y esta
              web funciona para publicar instrumentos, ubicar técnicos y
              estudios, revisar fotos de los encuentros y encontrar partituras.
            </p>
            <p>
              Las operaciones, acuerdos y garantias suceden por fuera del sitio.
              La web solo organiza informacion y datos de contacto, que siguen
              siendo de uso privado entre las personas involucradas.
            </p>
          </div>

          <div className="dashboard-card flex flex-col justify-between gap-6 p-6">
            <div className="space-y-3">
              <p className="dashboard-eyebrow">Apoyo</p>
              <h3 className="text-2xl font-semibold tracking-tight">
                Si la web te sirvió, podés ayudar a sostenerla con un cafecito.
              </h3>
              <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                Cada aporte ayuda a pagar los costos de mantenimiento del
                servidor y motiva a seguir mejorándola.
              </p>
            </div>

            <Link
              className="submit-button w-full justify-center sm:w-fit"
              href="https://cafecito.app/marcospozzo"
              rel="noopener noreferrer"
              target="_blank"
            >
              Ir a Cafecito
            </Link>
          </div>
        </div>
      </HomeSection>
    </div>
  );
}

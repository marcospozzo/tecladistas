import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { ProductProps, ProfessionalProps, StudioProps } from "@/types";
import {
  getAllSheetMusic,
  getProducts,
  getProfessionals,
  getStudios,
  getWhitelistedUsersCount,
  SheetMusic,
} from "@/utils/axios";
import {
  calculateRating,
  constants,
  skills,
  skillsTranslations,
} from "@/utils/utils";
import { getServerSession } from "next-auth/next";

const DASHBOARD_RENT_PRODUCTS = 1;
const DASHBOARD_SALE_PRODUCTS = 3;
const DASHBOARD_FEATURED_PROFESSIONALS = 4;
const DASHBOARD_FEATURED_STUDIOS = 5;
const DASHBOARD_FEATURED_SHEET_MUSIC = 5;
const DASHBOARD_FEATURED_PHOTOS = 6;
const DASHBOARD_PHOTOS_YEAR = "2025";

export type HomeStat = {
  detail: string;
  label: string;
  value: string;
};

export type HomeQuickLink = {
  description: string;
  href: string;
  metric: string;
  requiresLogin?: boolean;
  title: string;
};

export type HomeHighlightedSkill = {
  count: number;
  key: string;
  label: string;
};

export type HomePhoto = {
  description?: string;
  original: string;
  originalAlt?: string;
  thumbnail?: string;
  thumbnailAlt?: string;
};

export type HomeDashboardData = {
  featuredProfessionals: ProfessionalProps[];
  featuredStudios: StudioProps[];
  heroPhoto?: HomePhoto;
  isLoggedIn: boolean;
  memberCountLabel: string;
  photos: HomePhoto[];
  photosYear: string;
  productsForRent: ProductProps[];
  productsForSale: ProductProps[];
  quickLinks: HomeQuickLink[];
  sessionUserId?: string;
  stats: HomeStat[];
  totalRentProductsCount: number;
  totalSaleProductsCount: number;
  topSheetMusic: SheetMusic[];
  topSkills: HomeHighlightedSkill[];
};

function formatCount(value: number) {
  return new Intl.NumberFormat("es-AR").format(value);
}

function getSettledValue<T>(
  result: PromiseSettledResult<T>,
  fallbackValue: T,
): T {
  return result.status === "fulfilled" ? result.value : fallbackValue;
}

function getTimeValue(value?: string) {
  if (!value) {
    return 0;
  }

  const parsedValue = new Date(value).getTime();
  return Number.isNaN(parsedValue) ? 0 : parsedValue;
}

function isActiveProduct(product: ProductProps) {
  return product.status ? product.status === "active" : true;
}

function isActiveStudio(studio: StudioProps) {
  return studio.status ? studio.status === "active" : true;
}

function sortProductsByDateDesc(products: ProductProps[]) {
  return [...products].sort(
    (leftProduct, rightProduct) =>
      getTimeValue(rightProduct.createdAt) -
      getTimeValue(leftProduct.createdAt),
  );
}

function getTopSkills(professionals: ProfessionalProps[]) {
  const counters = professionals.reduce<Record<string, number>>(
    (currentCounters, professional) => {
      for (const skill of professional.skills ?? []) {
        currentCounters[skill] = (currentCounters[skill] ?? 0) + 1;
      }

      return currentCounters;
    },
    {},
  );

  return skills
    .map((skill) => ({
      key: skill,
      label: skillsTranslations[skill] ?? skill,
      count: counters[skill] ?? 0,
    }))
    .filter((skill) => skill.count > 0)
    .sort(
      (leftSkill, rightSkill) =>
        rightSkill.count - leftSkill.count ||
        leftSkill.label.localeCompare(rightSkill.label, "es"),
    );
}

function getFeaturedProfessionals(professionals: ProfessionalProps[]) {
  return [...professionals]
    .sort(
      (leftProfessional, rightProfessional) =>
        calculateRating(rightProfessional.ratings) -
          calculateRating(leftProfessional.ratings) ||
        (rightProfessional.ratings?.length ?? 0) -
          (leftProfessional.ratings?.length ?? 0) ||
        leftProfessional.firstName.localeCompare(
          rightProfessional.firstName,
          "es",
        ),
    )
    .slice(0, DASHBOARD_FEATURED_PROFESSIONALS);
}

function getFeaturedStudios(studios: StudioProps[]) {
  return [...studios]
    .sort(
      (leftStudio, rightStudio) =>
        Number(Boolean(rightStudio.images?.[0])) -
          Number(Boolean(leftStudio.images?.[0])) ||
        Number(Boolean(rightStudio.website)) -
          Number(Boolean(leftStudio.website)) ||
        leftStudio.name.localeCompare(rightStudio.name, "es"),
    )
    .slice(0, DASHBOARD_FEATURED_STUDIOS);
}

function getTopSheetMusic(sheetMusic: SheetMusic[]) {
  return [...sheetMusic]
    .sort(
      (leftSheet, rightSheet) =>
        rightSheet.downloadCount - leftSheet.downloadCount ||
        (leftSheet.composer ?? leftSheet.title ?? "").localeCompare(
          rightSheet.composer ?? rightSheet.title ?? "",
          "es",
        ),
    )
    .slice(0, DASHBOARD_FEATURED_SHEET_MUSIC);
}

function getScatteredPhotosForToday(photos: HomePhoto[]) {
  const selectedPhotosCount = Math.min(DASHBOARD_FEATURED_PHOTOS, photos.length);

  if (selectedPhotosCount <= 1) {
    return photos.slice(0, selectedPhotosCount);
  }

  const daysSinceEpoch = Math.floor(Date.now() / 86_400_000);
  const rotationOffset = daysSinceEpoch % photos.length;
  const selectedIndexes = Array.from(
    { length: selectedPhotosCount },
    (_, index) => (Math.floor((index * photos.length) / selectedPhotosCount) + rotationOffset) % photos.length,
  );

  return selectedIndexes.map((index) => photos[index]);
}

async function getHomePhotos(year: string): Promise<{
  heroPhoto?: HomePhoto;
  photos: HomePhoto[];
}> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const secret = process.env.NEXT_SECRET;

  if (!apiBaseUrl || !secret) {
    return { photos: [] };
  }

  const response = await fetch(`${apiBaseUrl}/photos/${year}`, {
    cache: "no-store",
    headers: {
      "accept-encoding": "identity",
      authorization: secret,
    },
  });

  if (!response.ok) {
    throw new Error(`Unable to load photos preview: ${response.status}`);
  }

  const photos = (await response.json()) as HomePhoto[];

  return {
    heroPhoto: photos[0],
    photos: getScatteredPhotosForToday(photos),
  };
}

function buildStats(params: {
  activeProductsCount: number;
  activeStudiosCount: number;
  memberCountLabel: string;
  professionalsCount: number;
  rentProductsCount: number;
  saleProductsCount: number;
  sheetMusicCount: number;
  sheetMusicGenresCount: number;
  topSkillsCount: number;
}) {
  return [
    {
      label: "Instrumentos",
      value: formatCount(params.activeProductsCount),
      detail: `${formatCount(params.saleProductsCount)} en venta · ${formatCount(
        params.rentProductsCount,
      )} en alquiler`,
    },
    {
      label: "Profesionales",
      value: formatCount(params.professionalsCount),
      detail: `${formatCount(params.topSkillsCount)} rubros`,
    },
    {
      label: "Estudios",
      value: formatCount(params.activeStudiosCount),
      detail: "Grabacion, mezcla, mastering y produccion",
    },
    {
      label: "Partituras",
      value: formatCount(params.sheetMusicCount),
      detail: `${formatCount(params.sheetMusicGenresCount)} géneros`,
    },
    {
      label: "Integrantes",
      value: params.memberCountLabel,
      detail: "Y contando...",
    },
  ];
}

function buildQuickLinks(params: {
  activeProductsCount: number;
  activeStudiosCount: number;
  photosCount: number;
  photosYear: string;
  professionalsCount: number;
  sheetMusicCount: number;
  topSkillsCount: number;
}) {
  return [
    {
      title: constants.INSTRUMENTS,
      href: constants.INSTRUMENTS_PATH,
      metric: formatCount(params.activeProductsCount),
      description: "Venta y alquiler directo entre colegas.",
    },
    {
      title: constants.PROFESSIONALS,
      href: constants.PROFESSIONALS_PATH,
      metric: formatCount(params.professionalsCount),
      description: `${formatCount(
        params.topSkillsCount,
      )} rubros para soporte en todas las áreas`,
    },
    {
      title: constants.STUDIOS,
      href: constants.STUDIOS_PATH,
      metric: formatCount(params.activeStudiosCount),
      description: "Grabación, producción y mezcla directo entre colegas.",
    },
    {
      title: constants.SHEETMUSIC,
      href: constants.SHEETMUSIC_PATH,
      metric: formatCount(params.sheetMusicCount),
      description:
        "Partituras ordenadas y categorizadas para encontrar de todo fácilmente.",
      requiresLogin: true,
    },
    {
      title: constants.PICTURES,
      href: constants.PICTURES_2025_PATH,
      metric:
        params.photosCount > 0
          ? `${formatCount(params.photosCount)} previews`
          : `Galeria ${params.photosYear}`,
      description: `Encuentros y registros visuales del grupo en ${params.photosYear}.`,
      requiresLogin: true,
    },
  ];
}

export function buildSheetMusicPreviewHref(sheetMusic: SheetMusic) {
  const filterValue = [
    sheetMusic.title,
    sheetMusic.composer,
    sheetMusic.fileName,
  ]
    .filter((value): value is string => Boolean(value))
    .map((value) => value.trim())
    .find((value) => Boolean(value));

  return filterValue
    ? `${constants.SHEETMUSIC_PATH}?containsFilter=${encodeURIComponent(
        filterValue,
      )}`
    : constants.SHEETMUSIC_PATH;
}

export async function getHomeDashboardData(): Promise<HomeDashboardData> {
  const requests = [
    getServerSession(authOptions),
    getWhitelistedUsersCount(),
    getProducts(),
    getProfessionals(),
    getStudios(),
    getAllSheetMusic(),
    getHomePhotos(DASHBOARD_PHOTOS_YEAR),
  ] as const;

  const [
    sessionResult,
    memberCountResult,
    productsResult,
    professionalsResult,
    studiosResult,
    sheetMusicResult,
    photosResult,
  ] = await Promise.allSettled(requests);

  const session = getSettledValue(sessionResult, null);
  const products = getSettledValue(productsResult, []);
  const professionals = getSettledValue(professionalsResult, []);
  const studios = getSettledValue(studiosResult, []);
  const sheetMusic = getSettledValue(sheetMusicResult, []);
  const homePhotos = getSettledValue(photosResult, { photos: [] });
  const heroPhoto = homePhotos.heroPhoto;
  const photos = homePhotos.photos;

  const activeProducts = products.filter(isActiveProduct);
  const saleProducts = sortProductsByDateDesc(
    activeProducts.filter((product) => product.listingType === constants.SALE),
  );
  const rentProducts = sortProductsByDateDesc(
    activeProducts.filter((product) => product.listingType === constants.RENT),
  );
  const activeStudios = studios.filter(isActiveStudio);
  const sortedSkills = getTopSkills(professionals);
  const topSkills = sortedSkills.slice(0, 6);
  const topSheetMusic = getTopSheetMusic(sheetMusic);
  const sheetMusicGenresCount = new Set(
    sheetMusic
      .map((sheet) => sheet.genre?.trim())
      .filter((genre): genre is string => Boolean(genre)),
  ).size;

  const rawMemberCount =
    memberCountResult.status === "fulfilled"
      ? Number(memberCountResult.value.count)
      : Number.NaN;
  const memberCountLabel = Number.isFinite(rawMemberCount)
    ? formatCount(rawMemberCount)
    : "400+";

  return {
    featuredProfessionals: getFeaturedProfessionals(professionals),
    featuredStudios: getFeaturedStudios(activeStudios),
    heroPhoto,
    isLoggedIn: Boolean(session),
    memberCountLabel,
    photos,
    photosYear: DASHBOARD_PHOTOS_YEAR,
    productsForRent: rentProducts.slice(0, DASHBOARD_RENT_PRODUCTS),
    productsForSale: saleProducts.slice(0, DASHBOARD_SALE_PRODUCTS),
    quickLinks: buildQuickLinks({
      activeProductsCount: activeProducts.length,
      activeStudiosCount: activeStudios.length,
      photosCount: photos.length,
      photosYear: DASHBOARD_PHOTOS_YEAR,
      professionalsCount: professionals.length,
      sheetMusicCount: sheetMusic.length,
      topSkillsCount: sortedSkills.length,
    }),
    sessionUserId: session?.user.id,
    stats: buildStats({
      activeProductsCount: activeProducts.length,
      activeStudiosCount: activeStudios.length,
      memberCountLabel,
      professionalsCount: professionals.length,
      rentProductsCount: rentProducts.length,
      saleProductsCount: saleProducts.length,
      sheetMusicCount: sheetMusic.length,
      sheetMusicGenresCount,
      topSkillsCount: sortedSkills.length,
    }),
    totalRentProductsCount: rentProducts.length,
    totalSaleProductsCount: saleProducts.length,
    topSheetMusic,
    topSkills,
  };
}

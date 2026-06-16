import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { ProductProps, ProfessionalProps, StudioProps, TeacherProfileProps } from "@/types";
import {
  getAllSheetMusic,
  getProducts,
  getProfessionals,
  getStudios,
  getTeacherProfiles,
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
const DASHBOARD_FEATURED_TEACHERS = 4;
const DASHBOARD_PHOTOS_YEAR = "2025";

export type HomeStat = {
  detail: string;
  key: "classes" | "instruments" | "members" | "professionals" | "sheetMusic" | "studios";
  label: string;
  value: string;
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
  featuredTeachers: TeacherProfileProps[];
  isLoggedIn: boolean;
  memberCountLabel: string;
  photos: HomePhoto[];
  photosYear: string;
  productsForRent: ProductProps[];
  productsForSale: ProductProps[];
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

async function getHomePhotos(year: string): Promise<{ photos: HomePhoto[] }> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const secret = process.env.NEXT_SECRET;

  if (!apiBaseUrl || !secret) {
    return { photos: [] };
  }

  const headers = {
    "accept-encoding": "identity",
    authorization: secret,
  };

  const dashboardResponse = await fetch(
    `${apiBaseUrl}/photos/dashboard?year=${year}&limit=${DASHBOARD_FEATURED_PHOTOS}`,
    { cache: "no-store", headers },
  );

  if (!dashboardResponse.ok) {
    throw new Error(`Unable to load photos preview: ${dashboardResponse.status}`);
  }

  const photos = (await dashboardResponse.json()) as HomePhoto[];

  return { photos };
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
  teachersCount: number;
  topSkillsCount: number;
}): HomeStat[] {
  return [
    {
      key: "instruments",
      label: "Instrumentos",
      value: formatCount(params.activeProductsCount),
      detail: `${formatCount(params.saleProductsCount)} en venta · ${formatCount(
        params.rentProductsCount,
      )} en alquiler`,
    },
    {
      key: "professionals",
      label: "Profesionales",
      value: formatCount(params.professionalsCount),
      detail: `${formatCount(params.topSkillsCount)} rubros`,
    },
    {
      key: "studios",
      label: "Estudios",
      value: formatCount(params.activeStudiosCount),
      detail: "Grabación, mezcla, mastering y producción",
    },
    {
      key: "sheetMusic",
      label: "Partituras",
      value: formatCount(params.sheetMusicCount),
      detail: `${formatCount(params.sheetMusicGenresCount)} géneros`,
    },
    {
      key: "classes",
      label: "Clases",
      value: formatCount(params.teachersCount),
      detail: "Profes del grupo disponibles",
    },
    {
      key: "members",
      label: "Integrantes",
      value: params.memberCountLabel,
      detail: "Y contando...",
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
  const session = await getServerSession(authOptions);
  const isLoggedIn = Boolean(session);

  const requests = [
    getWhitelistedUsersCount(),
    getProducts(),
    getProfessionals(),
    getStudios(),
    isLoggedIn ? getAllSheetMusic() : Promise.resolve([] as SheetMusic[]),
    getHomePhotos(DASHBOARD_PHOTOS_YEAR),
    getTeacherProfiles(),
  ] as const;

  const [
    memberCountResult,
    productsResult,
    professionalsResult,
    studiosResult,
    sheetMusicResult,
    photosResult,
    teachersResult,
  ] = await Promise.allSettled(requests);

  const products = getSettledValue(productsResult, []);
  const professionals = getSettledValue(professionalsResult, []);
  const studios = getSettledValue(studiosResult, []);
  const sheetMusic = getSettledValue(sheetMusicResult, []);
  const homePhotos = getSettledValue(photosResult, { photos: [] });
  const photos = homePhotos.photos;
  const teachers = getSettledValue(teachersResult, []);

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
    featuredTeachers: teachers.slice(0, DASHBOARD_FEATURED_TEACHERS),
    isLoggedIn,
    memberCountLabel,
    photos,
    photosYear: DASHBOARD_PHOTOS_YEAR,
    productsForRent: rentProducts.slice(0, DASHBOARD_RENT_PRODUCTS),
    productsForSale: saleProducts.slice(0, DASHBOARD_SALE_PRODUCTS),
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
      teachersCount: teachers.length,
      topSkillsCount: sortedSkills.length,
    }),
    totalRentProductsCount: rentProducts.length,
    totalSaleProductsCount: saleProducts.length,
    topSheetMusic,
    topSkills,
  };
}

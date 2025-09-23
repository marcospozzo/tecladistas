import { Rating } from "@/types";

export const constants = {
  INSTRUMENTS: "Instrumentos",
  PROFESSIONALS: "Listado de Profesionales",
  STUDIOS: "Estudios de Grabación",
  PICTURES: "Fotos",
  CONTACT: "Contacto",
  ABOUT_US: "Sobre nosotrxs",
  WHATSAPP_LINK: "https://wa.me/",
  LOGIN: "Entrar",
  LOGOUT: "Salir",
  EMAIL: "hola@tecladistas.com.ar",
  RENT: "rent",
  SALE: "sale",
  URL_SHORT: "tecladistas.com.ar",
  SIX_MONTHS_IN_SECONDS: 15552000,
  INSTRUMENTS_PATH: "/instrumentos",
  PROFESSIONALS_PATH: "/profesionales",
  STUDIOS_PATH: "/estudios",
  PICTURES_PATH: "/fotos",
  PICTURES_2023_PATH: "/fotos/2023",
  PICTURES_2022_PATH: "/fotos/2022",
  CONTACT_PATH: "/contacto",
  LOGIN_PATH: "/entrar",
  LOGOUT_PATH: "/api/auth/signout",
  PHOTOGRAPHERS_INSTAGRAM: "@aledesafinada",
  PHOTOGRAPHERS_INSTAGRAM_URL: "https://instagram.com/aledesafinada",
  SHEETMUSIC: "Partituras",
  SHEETMUSIC_PATH: "/partituras",
  HOME: "tecladistas",
};

export const skillsTranslations: { [key: string]: string } = {
  "synths-digital": "Sintetizadores digitales",
  "synths-analog": "Sintetizadores analógicos",
  "piano-mover": "Transportista de pianos",
  "electric-pianos": "Pianos eléctricos",
  "acoustic-pianos": "Pianos acústicos",
  "piano-tuner": "Afinador de pianos",
  organs: "Órganos",
  mics: "Micrófonos",
  "general-audio-gear": "Equipos de audio",
  "cables-headphones-pedals": "Cables, auriculares y pedales",
  computers: "Software, Mac y PC",
  "midi-controllers": "Controladores MIDI",
  luthier: "Luthiers",
  "in-ears": "In-ears",
  cases: "Estuches y fundas",
};

export const skillsPageIds: { [key: string]: string } = {
  "synths-digital": "sintetizadores",
  "synths-analog": "sintetizadores",
  "piano-mover": "transportistas",
  "electric-pianos": "pianos",
  "acoustic-pianos": "pianos",
  "piano-tuner": "afinadores",
  organs: "organos",
  mics: "microfonos",
  "general-audio-gear": "audio",
  "cables-headphones-pedals": "varios",
  computers: "software",
  "midi-controllers": "controladores",
  luthier: "luthiers",
  "in-ears": "in-ears",
  cases: "fundas",
};

export const placeholders: { [key: string]: string } = {
  title: "Ej.: Nord Stage 2 en muy buen estado",
  price: "Sólo números",
  location: "Barrio / Provincia (máx 20 caracteres)",
  description:
    "(Opcional) No incluir datos de contacto, como teléfono o email.",
  exchanges: "Escucho propuestas de intercambio, como parte de pago.",
  image: "Elegir o arrastrar una foto (máx. 20 MB)",
  disclamer: "Acepto mostrar mi nombre en la publicación.",
  brand: "",
  model: "",
  year: "(Opcional)",
};

export function formatPrice(price: any) {
  return Number(price).toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function formatPhone(phone: string) {
  return phone.replace(/[^0-9]/g, "");
}

export const servicesTranslation: { [key: string]: string } = {
  mixing: "Mezcla",
  mastering: "Mastering",
  recording: "Grabación",
  rehearsing: "Sala de ensayo",
  production: "Producción",
};

export const contactSubjects: { [key: string]: string } = {
  comment: "Comentario / sugerencia",
  professionalsAndStudios: "Profesionales / Estudios",
  sheetMusic: "Partituras",
  other: "Otro",
};

export const skills = [
  "piano-mover",
  "piano-tuner",
  "acoustic-pianos",
  "electric-pianos",
  "synths-analog",
  "synths-digital",
  "organs",
  "midi-controllers",
  "computers",
  "general-audio-gear",
  "cables-headphones-pedals",
  "in-ears",
  "cases",
  "mics",
  "luthier",
];

export const isProduction = process.env.NODE_ENV === "production";
export const cookieName = isProduction
  ? "__Secure-next-auth.session-token"
  : "next-auth.session-token";

export const imageTypes = ["JPG", "JPEG", "PNG"];

export const pageTitles: { [key: string]: string } = {
  professionals: "Profesionales",
  studios: "Estudios",
  instruments: "Instrumentos",
  verify: "Verificar",
  contact: "Contacto",
  createProduct: "Crear publicación",
  login: "Entrar",
  signUp: "Registrarse",
  home: "Tecladistas",
  sheetMusic: "Partituras",
};

export const calculateRating = (ratings: Array<Rating> | undefined): number => {
  if (ratings?.length === 0) {
    return 0;
  }

  const totalRating =
    ratings?.reduce((sum, rating) => sum + rating.rating, 0) ?? 0;
  const averageRating = totalRating / (ratings?.length ?? 1);

  return parseFloat(averageRating.toFixed(1));
};

export function productMessage(name: string, title: string): string {
  return `Hola ${name}! Soy tecladista gitanx, te contacto por tu instrumento ${title} publicado en la web de Tecladistas.`;
}

export function studioMessage(name: string, title: string): string {
  return `Hola ${name}! Soy tecladista gitanx, te contacto por tu estudio ${title} publicado en la web de Tecladistas.`;
}

import { Rating } from "@/types";

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
  price: "Sólo números (opcional)",
  location: "Barrio / Provincia (máx 20 caracteres)",
  description: "No incluir datos de contacto (opcional)",
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
  technicalProblem: "Problema técnico",
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

const isProduction = process.env.NODE_ENV === "production";
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
  home: "Tecladistas.ar",
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

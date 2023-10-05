export const skillsTranslations: { [key: string]: string } = {
  "synths": "Sintetizadores",
  "piano-mover": "Transportista de pianos",
  "electric-pianos": "Pianos eléctricos",
  "acoustic-pianos": "Pianos acústicos",
  "piano-tuner": "Afinador de pianos",
  "organs": "Órganos",
  "mics": "Micrófonos",
  "general-audio-gear": "Equipos de audio",
  "cables-headphones-pedals": "Cables, auriculares y pedales",
  "computers": "Software, Mac y PC",
  "midi-controllers": "Controladores MIDI",
  "luthier": "Luthiers",
  "in-ears": "In-ears",
  "cases": "Estuches y fundas",
};

export const placeholders: { [key: string]: string } = {
  "title": "Ej.: Nord Stage 2 en muy buen estado",
  "price": "Sólo números",
  "location": "Barrio / Municipio / Provincia",
  "description": "No es necesario incluir datos de contacto",
  "exchanges": "Escucho propuestas de intercambio, como parte de pago.",
  "image": "Elegir o arrastrar una foto (máx. 5 MB)",
  "disclamer":
    "Acepto mostrar mi nombre y número de teléfono en la publicación.",
  "brand": "",
  "model": "",
  "year": "Opcional",
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
  "mixing": "Mezcla",
  "mastering": "Mastering",
  "recording": "Grabación",
  "rehearsing": "Sala de ensayo",
  "production": "Producción",
};

export const contactSubjects: { [key: string]: string } = {
  "comment": "Comentario / sugerencia",
  "professionalAMD": "Alta / baja / modificación de profesional",
  "technicalProblem": "Problema técnico",
  "other": "Otro",
};

export const skills = [
  "piano-mover",
  "piano-tuner",
  "acoustic-pianos",
  "electric-pianos",
  "synths",
  "organs",
  "midi-controllers",
  "computers",
  "general-audio-gear",
  "cables-headphones-pedals",
  "cases",
  "mics",
  "luthier",
  "in-ears",
];

const isProduction = process.env.NODE_ENV === "production";
export const cookieName = isProduction
  ? "__Secure-next-auth.session-token"
  : "next-auth.session-token";

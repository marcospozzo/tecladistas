export const skillsTranslations: { [key: string]: string } = {
  "synths": "Sintetizadores",
  "piano-mover": "Transportistas de pianos",
  "electric-pianos": "Pianos eléctricos",
  "acoustic-pianos": "Pianos acústicos",
  "piano-tuner": "Afinadores de pianos",
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
  "title": "Ej.: Nord Stage 2 HA88 en muy buen estado",
  "price": "Sólo números",
  "location": "Barrio / Municipio / Provincia",
  "description": "No incluir datos de contacto",
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

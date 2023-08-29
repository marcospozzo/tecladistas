const studios = [
  {
    id: 1234,
    userId: 112233,
    type: "studio",
    condition: "new",
    category: "keyboard",
    brand: "Nord",
    model: "Stage 2",
    title: "E!!!",
    description:
      "El Nord Stage 2, una joya para músicos como yo, combina la versatilidad de sonidos de primera calidad con una interfaz amigable. Sus teclas responden a la perfección, brindando una experiencia musical incomparable. Con sonidos de piano, órgano y sintetizador de alta calidad, este teclado es mi elección para expresar mi pasión por la música en Buenos Aires. Ya sea en el estudio o en el escenario, el Nord Stage 2 nunca me falla.",
    year: 2022,
    tradeIns: true,
    status: "active",
    price: 2000,
    visibility: "open",
    pictures: ["/nord-stage-2-mock.jpeg"],
    location: "CABA",
    createdAt: "2023-08-21T13:45:00.000Z",
  },
  {
    id: 1235,
    userId: 112234,
    type: "studio",
    condition: "used",
    category: "keyboard",
    brand: "Roland",
    model: "RD-2000",
    title: "Roland RD-2000 en excelente estado",
    description:
      "El Roland RD-2000 es un teclado de escenario líder en su clase que combina un excepcional sonido de piano acústico con una amplia variedad de sonidos de sintetizador. Perfecto para actuaciones en vivo o sesiones de estudio. Incluye todas las funciones necesarias para músicos profesionales.",
    year: 2019,
    tradeIns: false,
    status: "active",
    price: 1800,
    visibility: "open",
    pictures: ["/roland-rd-2000-mock.jpeg"],
    location: "Buenos Aires",
    createdAt: "2023-08-21T14:30:00.000Z",
  },
  {
    id: 1236,
    userId: 112235,
    type: "studio",
    condition: "like new",
    category: "keyboard",
    brand: "Korg",
    model: "Kronos 88",
    title: "Korg Kronos 88 en perfecto estado",
    description:
      "El Korg Kronos 88 es un sintetizador y workstation líder en la industria. Con una amplia gama de sonidos y capacidades de grabación, es la elección de músicos profesionales en todo el mundo. Este teclado está en perfecto estado y listo para deslumbrar en el escenario.",
    year: 2021,
    tradeIns: true,
    status: "active",
    price: 2500,
    visibility: "open",
    pictures: ["/korg-kronos-88-mock.jpeg"],
    location: "Córdoba",
    createdAt: "2023-08-21T15:15:00.000Z",
  },
  {
    id: 1237,
    userId: 112236,
    type: "studio",
    condition: "used",
    category: "keyboard",
    brand: "Yamaha",
    model: "CP88",
    title: "Yamaha CP88 en excelente estado",
    description:
      "El Yamaha CP88 es un piano de escenario profesional que ofrece un sonido de primera calidad y una experiencia de interpretación auténtica. Este teclado se encuentra en excelente estado y es ideal para músicos que buscan un rendimiento de alto nivel.",
    year: 2020,
    tradeIns: false,
    status: "active",
    price: 1700,
    visibility: "open",
    pictures: ["/yamaha-cp88-mock.jpeg"],
    location: "Rosario",
    createdAt: "2023-08-21T16:00:00.000Z",
  },
  {
    id: 1238,
    userId: 112237,
    type: "studio",
    condition: "new",
    category: "keyboard",
    brand: "Casio",
    model: "PX-560",
    title: "Casio PX-560, ¡nuevo en caja!",
    description:
      "El Casio PX-560 es un piano digital portátil que combina un sonido de alta calidad con una amplia variedad de funciones. Este teclado está nuevo en su caja original, perfecto para músicos que buscan un instrumento versátil y fácil de transportar.",
    year: 2023,
    tradeIns: true,
    status: "active",
    price: 1200,
    visibility: "open",
    pictures: ["/casio-px-560-mock.jpeg"],
    location: "Mendoza",
    createdAt: "2023-08-21T17:00:00.000Z",
  },
  {
    id: 1239,
    userId: 112238,
    type: "studio",
    condition: "used",
    category: "keyboard",
    brand: "Kawai",
    model: "MP11SE",
    title: "Kawai MP11SE en buen estado",
    description:
      "El Kawai MP11SE es un piano de escenario premium conocido por su acción de teclado auténtica y sonidos de piano realistas. Este teclado ha sido utilizado pero se encuentra en buen estado de funcionamiento. Perfecto para músicos que buscan calidad y versatilidad.",
    year: 2018,
    tradeIns: false,
    status: "active",
    price: 1600,
    visibility: "open",
    pictures: ["/kawai-mp11se-mock.jpeg"],
    location: "San Juan",
    createdAt: "2023-08-21T18:00:00.000Z",
  },
  {
    id: 1240,
    userId: 112239,
    type: "studio",
    condition: "like new",
    category: "keyboard",
    brand: "Nord",
    model: "Electro 6D 73",
    title: "Nord Electro 6D 73 en estado impecable",
    description:
      "El Nord Electro 6D 73 es un teclado que combina sonidos de órgano y piano de alta calidad con funciones versátiles de sintetizador. Este teclado está en estado impecable, ideal para músicos que buscan una amplia gama de sonidos y facilidad de uso.",
    year: 2021,
    tradeIns: true,
    status: "active",
    price: 2100,
    visibility: "open",
    pictures: ["/nord-electro-6d-73-mock.jpeg"],
    location: "La Plata",
    createdAt: "2023-08-21T19:00:00.000Z",
  },
  {
    id: 1241,
    userId: 112240,
    type: "studio",
    condition: "used",
    category: "keyboard",
    brand: "Moog",
    model: "Subsequent 37",
    title: "Moog Subsequent 37 en excelente condición",
    description:
      "El Moog Subsequent 37 es un sintetizador analógico legendario conocido por su sonido cálido y potente. Este teclado ha sido usado pero se encuentra en excelente condición de funcionamiento. Perfecto para músicos que buscan sonidos de sintetizador únicos.",
    year: 2017,
    tradeIns: false,
    status: "active",
    price: 1900,
    visibility: "open",
    pictures: ["/moog-subsequent-37-mock.jpeg"],
    location: "Bahía Blanca",
    createdAt: "2023-08-21T20:00:00.000Z",
  },
  {
    id: 1242,
    userId: 112241,
    type: "studio",
    condition: "like new",
    category: "keyboard",
    brand: "Korg",
    model: "SV-2",
    title: "Korg SV-2, casi nuevo",
    description:
      "El Korg SV-2 es un piano de escenario que rinde homenaje a los legendarios teclados electro-mecánicos. Este teclado está en condición casi nueva y ofrece una amplia variedad de sonidos vintage. Perfecto para músicos que buscan ese toque retro.",
    year: 2022,
    tradeIns: true,
    status: "active",
    price: 1400,
    visibility: "open",
    pictures: ["/korg-sv-2-mock.jpeg"],
    location: "Tucumán",
    createdAt: "2023-08-21T21:00:00.000Z",
  },
  {
    id: 1243,
    userId: 112242,
    type: "studio",
    condition: "used",
    category: "keyboard",
    brand: "Nord",
    model: "Lead A1",
    title: "Nord Lead A1 en buen estado",
    description:
      "El Nord Lead A1 es un sintetizador virtual analógico conocido por su sonido fresco y versátil. Este teclado ha sido usado pero se encuentra en buen estado y ofrece un mundo de posibilidades sonoras. Ideal para músicos creativos.",
    year: 2016,
    tradeIns: false,
    status: "active",
    price: 1300,
    visibility: "open",
    pictures: ["/nord-lead-a1-mock.jpeg"],
    location: "Neuquén",
    createdAt: "2023-08-21T22:00:00.000Z",
  },
  {
    id: 1244,
    userId: 112243,
    type: "studio",
    condition: "new",
    category: "keyboard",
    brand: "Arturia",
    model: "KeyLab Essential 61",
    title: "Arturia KeyLab Essential 61, ¡nuevo en caja!",
    description:
      "El Arturia KeyLab Essential 61 es un controlador MIDI versátil que brinda una experiencia de producción musical completa. Este teclado está nuevo en su caja original y es perfecto para músicos que buscan control y creatividad en sus proyectos.",
    year: 2023,
    tradeIns: true,
    status: "active",
    price: 600,
    visibility: "open",
    pictures: ["/arturia-keylab-essential-61-mock.jpeg"],
    location: "Salta",
    createdAt: "2023-08-21T23:00:00.000Z",
  },
];

export default function (req, res) {
  res.status(200).json(studios);
}

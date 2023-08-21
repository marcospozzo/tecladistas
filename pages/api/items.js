export default function (req, res) {
  res.status(200).json({
    id: 1234,
    userId: 112233,
    type: "product",
    condition: "new",
    category: "keyboard",
    brand: "Nord",
    model: "Stage 2",
    title: "Nord Stage 2 como nuevo!!!",
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
  });
}

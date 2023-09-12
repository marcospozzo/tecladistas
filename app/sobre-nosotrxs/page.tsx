import Link from "next/link";

const AboutUs = () => {
  return (
    <div>
      <p>
        Tecladistxs Gitanxs es... Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Nisi sed incidunt eaque tenetur temporibus nam
        consequuntur officiis accusamus repudiandae, excepturi qui possimus
        itaque dolore, molestias molestiae culpa labore impedit exercitationem!
      </p>
      <p>
        La misión de esta web es reunir y facilitar información útil para la
        comunidad de Tecladistxs Gitanxs.
      </p>
      <p>
        Además, esta web conecta compradores con vendedores, sin ser
        intermediarios. Es decir: no participamos de operaciones, intercambio de
        dinero, garantías, ni acuerdos. La responsabilidad en cada compra, venta
        o servicio queda a cargo de cada usuario involucrado y sucede por fuera
        de esta web.
      </p>
      <p>
        Toda información personal, datos de contacto y números de teléfono son
        de uso privado y pedimos que se mantengan de esta forma.
      </p>
      <p>
        Los comentarios y sugerencias son bienvenidas (¡y muy alentadas!).
        Pueden hacerlas,{" "}
        <Link href={"/contacto"} className={"link"}>
          aquí
        </Link>
        .
      </p>
      <p>
        Quienes quieran y puedan contribuir económicamente a este proyecto, son
        invitadxs a hacerlo a través de cafecitos:{" "}
        <Link href={"/"} className={"link"}>
          aquí
        </Link>
        .
      </p>
    </div>
  );
};

export default AboutUs;

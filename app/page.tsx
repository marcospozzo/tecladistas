import Link from "next/link";

const AboutUs = () => {
  return (
    <div className="about-us">
      <p>
        La misión de esta web es reunir y facilitar información útil para el
        grupo Tecladistxs Gitanxs.
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
        Tecladistxs Gitanxs es...{" "}
        <i>-Completar párrafo de cómo nació el grupo-</i>
      </p>
      <p>
        Quienes quieran y puedan contribuir económicamente a este proyecto, son
        invitadxs a hacerlo a través de cafecitos:{" "}
        <Link
          href={"https://cafecito.app/marcospozzo"}
          className={"link"}
          target="_blank"
          rel="noopener noreferrer"
        >
          aquí
        </Link>
        .
      </p>
      <p>
        Los comentarios y sugerencias son bienvenidas. Pueden hacerlas,{" "}
        <Link href={"/contacto"} className={"link"}>
          aquí
        </Link>
        .
      </p>
      <Link className="flex justify-center sm:mt-20 mb-2" href="/registrarse">
        <button className="submit-button" type="submit" value="register">
          <h3 className="text-xl">Registrarse</h3>
        </button>
      </Link>
    </div>
  );
};

export default AboutUs;

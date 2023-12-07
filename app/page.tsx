import { getWhitelistedUsersCount } from "@/utils/axios";
import Image from "next/image";
import Link from "next/link";

const AboutUs = async () => {
  let whitelistedUsersCounter;
  try {
    const data = await getWhitelistedUsersCount();
    whitelistedUsersCounter = String(data.count);
  } catch (error) {
    whitelistedUsersCounter = "más de 280";
  }

  return (
    <div className="about-us">
      <p>
        Esta web reúne y facilita información útil para Tecladistxs Gitanxs.
      </p>
      <p>
        Aquí podés consultar el listado actualizado de contactos de técnicos de
        distintas áreas como transportistas y afinadores. <br />
        Además, podés publicar tu estudio de grabación y tus instrumentos en
        venta y alquiler.
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
      <Image
        className="w-full my-12 rounded-lg"
        src={"/keyboard.jpg"}
        alt="teclas de un piano o teclado"
        width={0}
        height={0}
        sizes="100vw"
        priority={true}
      />
      <p className="italic">
        "Tecladistxs Gitanxs es un grupo de intérpretes de estilos y géneros de
        los más diversos. <br />
        Comenzó en el 2013 con cuatro amigos tecladistas, que se juntaban para
        compartir la pasión por los pianos y los teclados. A través del boca en
        boca fueron sumando a más colegas y se iniciaron los encuentros
        tecladísticos anuales. <br /> Actualmente cuenta con{" "}
        {whitelistedUsersCounter} integrantes, y sigue creciendo. <br /> Algunos
        de los pilares del grupo son la generosidad, la humildad, la
        camaradería, el intercambio y la amistad."
      </p>
      <br />
      <p>
        Los desarrolladores de esta página no participamos de operaciones,
        intercambio de dinero, garantías, ni acuerdos en relación a esas ventas
        o servicios dados. La responsabilidad de dichas transacciones quedan a
        cargo de cada usuario involucrado, y las mismas suceden por fuera de
        esta web.
      </p>
      <p>
        Toda información personal, datos de contacto y números de teléfono son
        de uso privado y pedimos que se mantengan de esta forma.
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

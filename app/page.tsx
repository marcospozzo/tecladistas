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
      <p className="text-big">
        Esta web reúne y facilita información útil para Tecladistxs Gitanxs.
      </p>
      <p className="text-big">
        Aquí podés consultar el listado actualizado de contactos de técnicos de
        distintas áreas como transportistas y afinadores. <br />
        Además, podés publicar tu estudio de grabación y tus instrumentos en
        venta y alquiler.
      </p>
      <div className="mb-10 space-y-4">
        <Link className="flex justify-center" href="/registrarse">
          <button className="submit-button" type="submit" value="register">
            <h3>Registrarse</h3>
          </button>
        </Link>
        <div className="flex justify-center space-x-1 mb-2">
          <h3>¿Ya estás registradx? </h3>
          <Link className="link" href="/entrar">
            Entrar
          </Link>
        </div>
      </div>

      <Image
        className="w-full mb-12 rounded-lg"
        src={"/keyboard.jpg"}
        alt="teclas de un piano o teclado"
        width={0}
        height={0}
        sizes="100vw"
        priority={true}
      />

      <p className="italic text-big">
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
      <p className="text-big">
        Quienes puedan contribuir económicamente a este proyecto web, son
        invitadxs a hacerlo a través de cafecitos:{" "}
      </p>
      <div className="flex justify-center mb-12">
        <Link
          href={"https://cafecito.app/marcospozzo"}
          className={"link"}
          target="_blank"
        >
          <img
            srcSet="https://cdn.cafecito.app/imgs/buttons/button_1.png 1x, https://cdn.cafecito.app/imgs/buttons/button_1_2x.png 2x, https://cdn.cafecito.app/imgs/buttons/button_1_3.75x.png 3.75x"
            src="https://cdn.cafecito.app/imgs/buttons/button_1.png"
            alt="Invitame un café en cafecito.app"
          />
        </Link>
      </div>
      <p className="small-text">
        Los desarrolladores de esta página no participamos de operaciones,
        intercambio de dinero, garantías, ni acuerdos en relación a ventas o
        servicios dados. Las mismas suceden por fuera de esta web y esa
        responsabilidad queda a cargo de cada usuario involucrado. Toda
        información personal, datos de contacto y números de teléfono son de uso
        privado y pedimos que se mantengan de esta forma.
      </p>
    </div>
  );
};

export default AboutUs;

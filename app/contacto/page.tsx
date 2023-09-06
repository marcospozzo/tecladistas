const Contact = () => {
  return (
    <form
      className="flex flex-col w-full md:w-1/2  mx-auto"
      action="#"
      method="post"
    >
      <h1 className="self-center mb-12">Contacto</h1>
      <input type="text" id="name" name="name" placeholder="Nombre" required />
      <br />

      <input
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        required
      />
      <br />

      <select className="bg-white" id="subject" name="subject" required>
        <option value="Comentario/sugerencia">Comentario/sugerencia</option>
        <option value="Alta/baja de profesional">
          Alta/baja/modificación de profesional
        </option>
        <option value="Problema técnico">Problema técnico</option>
        <option value="Otro">Otro</option>
      </select>
      <br />

      <textarea
        className="h-24 min-h-[6rem]"
        id="message"
        name="message"
        placeholder="Mensaje"
        required
      ></textarea>
      <br />

      <button type="submit" value="Enviar">
        Enviar
      </button>
    </form>
  );
};

export default Contact;

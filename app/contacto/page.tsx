import { contactSubjects } from "@/utils/utils";

const Contact = () => {
  return (
    <form className="wide-form" action="#" method="post">
      <h1 className="form-title">Contacto</h1>
      <input type="text" id="name" name="name" placeholder="Nombre" required />

      <input
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        required
      />

      <select className="bg-white" id="subject" name="subject" required>
        <option value={contactSubjects.comment}>
          {contactSubjects.comment}
        </option>
        <option value={contactSubjects.professionalAMD}>
          {contactSubjects.professionalAMD}
        </option>
        <option value={contactSubjects.technicalProblem}>
          {contactSubjects.technicalProblem}
        </option>
        <option value={contactSubjects.other}>{contactSubjects.other}</option>
      </select>

      <textarea
        className="h-24 min-h-[6rem] max-h-96"
        id="message"
        name="message"
        placeholder="Mensaje"
        required
      ></textarea>

      <br />

      <button className="submit-button" type="submit" value="Enviar">
        <h3 className="text-xl">Enviar</h3>
      </button>
    </form>
  );
};

export default Contact;

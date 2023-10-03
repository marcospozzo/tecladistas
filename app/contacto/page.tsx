"use client";

import { contactSubjects } from "@/utils/utils";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

const Contact = () => {
  const router = useRouter();
  const [data, setData] = useState({
    subject: contactSubjects.comment,
    message: "",
  });

  const handleOnChange = (event: { target: { name: any; value: any } }) => {
    if (event.target) {
      setData({
        ...data,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("subject", data.subject);
    formData.append("message", data.message);

    try {
      const promise = axios.post("/api/contact-form", formData);
      toast.promise(promise, {
        pending: "Enviando...",
        success: "Enviado",
        error: {
          render({
            data,
          }: {
            data?: { response?: { data?: { error?: string } } };
          }) {
            console.log({ data });
            return data?.response?.data?.error ?? "Error";
          },
        },
      });
      await promise;
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="wide-form" onSubmit={handleSubmit}>
      <h1 className="form-title">Contacto</h1>

      <select
        className="bg-white"
        id="subject"
        name="subject"
        onChange={handleOnChange} // Add this line
        required
      >
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
        onChange={handleOnChange}
        required
      ></textarea>

      <br />

      <button
        className="submit-button form-button"
        type="submit"
        value="Enviar"
      >
        <h3 className="text-xl">Enviar mensaje</h3>
      </button>
    </form>
  );
};

export default Contact;

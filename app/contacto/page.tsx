"use client";

import { Button } from "@/components/ui/Button";
import Field from "@/components/ui/Field";
import FormShell from "@/components/ui/FormShell";
import { contactSubjects } from "@/utils/utils";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

const Contact = () => {
  const router = useRouter();
  const [data, setData] = useState({
    subject: contactSubjects.comment,
    message: "",
  });

  const handleOnChange = (
    event: ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
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
    <FormShell
      description="Usá este formulario para comentarios, sugerencias o temas administrativos."
      eyebrow="Soporte"
      size="default"
      title="Contacto"
    >
      <form className="ui-form-grid" onSubmit={handleSubmit}>
        <Field htmlFor="subject" label="Motivo">
          <select
            className="ui-select"
            id="subject"
            name="subject"
            onChange={handleOnChange}
            required
          >
            {Object.entries(contactSubjects).map(([key, value]) => (
              <option key={key} value={value}>
                {value}
              </option>
            ))}
          </select>
        </Field>

        <Field htmlFor="message" label="Mensaje">
          <textarea
            className="ui-textarea max-h-96"
            id="message"
            name="message"
            onChange={handleOnChange}
            placeholder="Mensaje"
            required
          ></textarea>
        </Field>

        <div className="ui-form-actions">
          <Button type="submit">Enviar mensaje</Button>
        </div>
      </form>
    </FormShell>
  );
};

export default Contact;

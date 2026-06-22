"use client";

import { Button } from "@/components/ui/Button";
import Field from "@/components/ui/Field";
import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

type Props = { slug: string };

const emptyForm = { senderName: "", senderEmail: "", message: "", website: "" };

const TeacherContactForm = ({ slug }: Props) => {
  const [form, setForm] = useState(emptyForm);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("senderName", form.senderName);
    formData.append("senderEmail", form.senderEmail);
    formData.append("message", form.message);
    formData.append("website", form.website);

    setIsLoading(true);
    const toastId = toast.loading("Enviando mensaje...");
    try {
      await axios.post(`/api/teacher-profiles/${slug}/contact`, formData);
      setForm(emptyForm);
      toast.update(toastId, {
        render: "Mensaje enviado",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? (error.response?.data?.error ?? "Error al enviar el mensaje")
        : "Error al enviar el mensaje";
      toast.update(toastId, {
        render: message,
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="ui-form-grid" onSubmit={handleSubmit}>
      <Field htmlFor="senderName" label="Tu nombre">
        <input
          className="ui-input"
          id="senderName"
          name="senderName"
          onChange={handleChange}
          placeholder="Nombre"
          required
          type="text"
          value={form.senderName}
        />
      </Field>
      <Field htmlFor="senderEmail" label="Tu email">
        <input
          className="ui-input"
          id="senderEmail"
          name="senderEmail"
          onChange={handleChange}
          placeholder="tu@email.com"
          required
          type="email"
          value={form.senderEmail}
        />
      </Field>
      <Field htmlFor="message" label="Mensaje">
        <textarea
          className="ui-textarea"
          id="message"
          name="message"
          onChange={handleChange}
          placeholder="Escribe tu mensaje aquí..."
          required
          rows={4}
          value={form.message}
        />
      </Field>
      {/* honeypot — invisible para humanos, bots lo completan */}
      <input
        aria-hidden="true"
        autoComplete="off"
        name="website"
        onChange={handleChange}
        style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0 }}
        tabIndex={-1}
        type="text"
        value={form.website}
      />
      <div className="ui-form-actions">
        <Button disabled={isLoading} fullWidth type="submit">
          {isLoading ? "Enviando..." : "Enviar consulta"}
        </Button>
      </div>
    </form>
  );
};

export default TeacherContactForm;

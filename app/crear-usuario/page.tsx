"use client";

import { Button } from "@/components/ui/Button";
import Field from "@/components/ui/Field";
import FormShell from "@/components/ui/FormShell";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const CreateWhitelisted = () => {
  const router = useRouter();
  const [data, setData] = useState({
    displayName: "",
    phone: "+549",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target) {
      setData({
        ...data,
        [event.target.name]: event.target.value,
      });
    }
  };

  function handlePhoneChange(value: string | undefined) {
    setData({
      ...data,
      phone: value ?? "",
    });
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("displayName", data.displayName);
    formData.append("phone", data.phone);

    try {
      const promise = axios.post("/api/users/create-whitelisted", formData);

      toast.promise(promise, {
        pending: "Creando...",
        success: {
          render({ data }: { data?: { data?: { success?: string } } }) {
            setTimeout(() => {
              router.push("/");
            }, 1000);
            return data?.data?.success || "Test";
          },
        },
        error: {
          render({
            data,
          }: {
            data?: { response?: { data?: { error?: string } } };
          }) {
            return data?.response?.data?.error || "Error";
          },
        },
      });
      await promise;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormShell
      description="Alta manual de un usuario habilitado para ingresar."
      eyebrow="Administración"
      size="narrow"
      title="Crear usuario"
    >
      <form className="ui-form-grid" onSubmit={handleSubmit}>
        <Field htmlFor="displayName" label="Nombre">
          <input
            className="ui-input"
            id="displayName"
            name="displayName"
            onChange={handleChange}
            placeholder="Nombre"
            type="text"
          />
        </Field>

        <Field htmlFor="phone" label="WhatsApp">
          <PhoneInput
            className="ui-phone-input"
            countryCallingCodeEditable={false}
            defaultCountry="AR"
            id="phone"
            international
            name="phone"
            onChange={handlePhoneChange}
            value={data.phone}
          />
        </Field>

        <div className="ui-form-actions">
          <Button fullWidth type="submit">
            Crear usuario
          </Button>
        </div>
      </form>
    </FormShell>
  );
};

export default CreateWhitelisted;

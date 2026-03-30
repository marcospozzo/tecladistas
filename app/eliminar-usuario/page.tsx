"use client";

import { Button } from "@/components/ui/Button";
import Field from "@/components/ui/Field";
import FormShell from "@/components/ui/FormShell";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { toast } from "react-toastify";

const DeleteWhitelisted = () => {
  const router = useRouter();
  const [data, setData] = useState({
    phone: "+549",
  });

  function handlePhoneChange(value: string | undefined) {
    setData({
      ...data,
      phone: value ?? "",
    });
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("phone", data.phone);

    try {
      const promise = axios.post("/api/users/delete-whitelisted", formData);

      toast.promise(promise, {
        pending: "Eliminando...",
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
      description="Eliminá una autorización vigente usando el número de teléfono asociado."
      eyebrow="Administración"
      size="narrow"
      title="Eliminar usuario"
    >
      <form className="ui-form-grid" onSubmit={handleSubmit}>
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
          <Button fullWidth variant="danger" type="submit">
            Eliminar usuario
          </Button>
        </div>
      </form>
    </FormShell>
  );
};

export default DeleteWhitelisted;

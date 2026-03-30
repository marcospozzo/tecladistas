"use client";

import { Button } from "@/components/ui/Button";
import Field from "@/components/ui/Field";
import FormShell from "@/components/ui/FormShell";
import { UserProps } from "@/types";
import { constants } from "@/utils/utils";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const SignUp = () => {
  const router = useRouter();
  const [data, setData] = useState<UserProps>({
    _id: "",
    firstName: "",
    lastName: "",
    phone: "+549",
    email: "",
  });

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const promise = axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/create`,
        data
      );
      toast.promise(promise, {
        success: "Usuario creado. Redirigiendo...",
        pending: "Cargando...",
        error: {
          render({
            data,
          }: {
            data?: {
              response?: { data?: { error?: string; err?: { code?: number } } };
            };
          }) {
            const errorData = data?.response?.data;
            let errorMessage = errorData?.error ?? "Error";

            if (errorData?.err?.code === 11000) {
              errorMessage = "Usuario ya existe. Redirigiendo...";
              setTimeout(() => {
                router.push(constants.LOGIN_PATH);
              }, 1000);
            }
            return errorMessage;
          },
        },
      });
      await promise;
      router.push(constants.LOGIN_PATH);
    } catch (error) {
      console.error(error);
    }
  };

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  }

  function handlePhoneChange(value: string | undefined) {
    setData({
      ...data,
      phone: value ?? "",
    });
  }

  return (
    <FormShell
      description="Completá tus datos para solicitar acceso al grupo y a la web."
      eyebrow="Cuenta"
      size="narrow"
      title="Registrarse"
    >
      <form className="ui-form-grid" onSubmit={handleSubmit}>
        <div className="text-center text-sm text-slate-600 dark:text-slate-300">
          ¿Ya estás registradx?{" "}
          <Link className="font-semibold underline" href={constants.LOGIN_PATH}>
            Entrar
          </Link>
        </div>

        <Field htmlFor="firstName" label="Nombre">
          <input
            className="ui-input"
            id="firstName"
            name="firstName"
            onChange={handleChange}
            placeholder="Nombre"
            required
            type="text"
          />
        </Field>

        <Field htmlFor="lastName" label="Apellido">
          <input
            className="ui-input"
            id="lastName"
            name="lastName"
            onChange={handleChange}
            placeholder="Apellido"
            required
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

        <Field
          description="Será requerido para entrar."
          htmlFor="email"
          label="Email"
        >
          <input
            className="ui-input"
            id="email"
            name="email"
            onChange={handleChange}
            placeholder="Email"
            required
            type="email"
          />
        </Field>

        <div className="ui-form-actions">
          <Button fullWidth type="submit">
            Registrarse
          </Button>
        </div>
      </form>
    </FormShell>
  );
};

export default SignUp;

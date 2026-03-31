"use client";

import { Button } from "@/components/ui/Button";
import Field from "@/components/ui/Field";
import FormShell from "@/components/ui/FormShell";
import { UserProps } from "@/types";
import { constants } from "@/utils/utils";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

function normalizeName(value: string) {
  return value
    .trim()
    .toLocaleLowerCase("es-AR")
    .replace(/\s+/g, " ")
    .replace(
      /(^|[\s'-])([A-Za-zÁÉÍÓÚÜÑáéíóúüñ])/g,
      (_match, prefix: string, letter: string) =>
        `${prefix}${letter.toLocaleUpperCase("es-AR")}`,
    );
}

function normalizeEmail(value: string) {
  return value.trim().toLocaleLowerCase("es-AR");
}

const SignUp = () => {
  const router = useRouter();
  const [data, setData] = useState<UserProps>({
    _id: "",
    firstName: "",
    lastName: "",
    phone: "+549",
    email: "",
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedData = {
      ...data,
      email: normalizeEmail(data.email),
      firstName: normalizeName(data.firstName),
      lastName: normalizeName(data.lastName),
    };
    const requestData = {
      email: normalizedData.email,
      firstName: normalizedData.firstName,
      lastName: normalizedData.lastName,
      phone: normalizedData.phone,
    };

    setData(normalizedData);

    try {
      const promise = axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/create`,
        requestData,
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
      if (!axios.isAxiosError(error) || !error.response) {
        console.error(error);
      }
    }
  };

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    const normalizedValue =
      name === "email"
        ? normalizeEmail(value)
        : name === "firstName" || name === "lastName"
          ? normalizeName(value)
          : value;

    setData({
      ...data,
      [name]: normalizedValue,
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
      description="Completá tus datos por única vez para darte de alta en la web. La registración solo está habilidada para miembros del grupo de WhatsApp."
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
            value={data.firstName}
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
            value={data.lastName}
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
            value={data.email}
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

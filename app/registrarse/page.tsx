"use client";

import { UserProps } from "@/types";
import { LOGIN_PATH } from "@/utils/constants";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const SignUp = () => {
  const router = useRouter();
  const [data, setData] = useState<UserProps>({
    _id: "",
    firstName: "",
    lastName: "",
    phone: "",
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
            data?: { response?: { data?: { error?: string; err: any } } };
          }) {
            const errorData = data?.response?.data;
            let errorMessage = errorData?.error ?? "Error";

            if (errorData && errorData.err?.code === 11000) {
              errorMessage = "Usuario ya existe. Redirigiendo...";
              setTimeout(() => {
                router.push(LOGIN_PATH);
              }, 1000);
            }
            return errorMessage;
          },
        },
      });
      await promise;
      router.push(LOGIN_PATH);
    } catch (error) {
      console.error(error);
    }
  };

  function handleChange(event: { target: { name: any; value: any } }) {
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
    <form className="login-signup" onSubmit={handleSubmit}>
      <h1 className="form-title">Registrarse</h1>
      <div className="flex justify-center space-x-1 mb-2">
        <h3>¿Ya estás registradx? </h3>
        <Link className="link" href={LOGIN_PATH}>
          Entrar
        </Link>
      </div>
      <input
        type="text"
        id="firstName"
        name="firstName"
        placeholder="Nombre"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        id="lastName"
        name="lastName"
        placeholder="Apellido"
        onChange={handleChange}
        required
      />
      <PhoneInput
        className="pl-4 gap-x-2 w-full"
        id="phone"
        name="phone"
        international
        countryCallingCodeEditable={false}
        defaultCountry="AR"
        value={"+549"}
        onChange={handlePhoneChange}
      />
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <i className="self-center text-center mb-2">Será requerido para entrar</i>

      <br />
      <button className="submit-button" type="submit" value="create">
        <h3>Registrarse</h3>
      </button>
    </form>
  );
};

export default SignUp;

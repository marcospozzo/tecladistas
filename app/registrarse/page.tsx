"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { UserProps } from "@/types";

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
                router.push("/entrar");
              }, 1000);
            }
            return errorMessage;
          },
        },
      });
      await promise;
      router.push("/entrar");
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

  return (
    <form className="login-signup" onSubmit={handleSubmit}>
      <h1 className="form-title">Registrarse</h1>
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
      <input
        type="text"
        id="phone"
        name="phone"
        placeholder="Celular (formato: 5491122334455)"
        onChange={handleChange}
        required
      />
      <i className="self-center text-center mb-2">
        Solo números, con prefijo de país, sin espacios ni guiones
      </i>
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
      <button
        className="submit-button form-button"
        type="submit"
        value="create"
      >
        <h3 className="text-xl">Registrarse</h3>
      </button>
    </form>
  );
};

export default SignUp;

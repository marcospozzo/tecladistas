"use client";

import { createAccount } from "@/utils/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const SignUp = () => {
  const router = useRouter();
  const [data, setData] = useState({});

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      await createAccount(data);
      router.push("/clasificados");
    } catch (error) {
      console.error(error);
      toast.error("Error. Reintentar...");
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
      <h1 className="form-title">Crear cuenta</h1>
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
        placeholder="Celular (Ej.: 5491122334455)"
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
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Contraseña"
        onChange={handleChange}
        required
      />
      <i className="self-center text-center mb-2">
        Será requerida para ingresar
      </i>

      <br />
      <button
        className="submit-button form-button"
        type="submit"
        value="create"
      >
        <h3 className="text-xl">Crear cuenta</h3>
      </button>
    </form>
  );
};

export default SignUp;

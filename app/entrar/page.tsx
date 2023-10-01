"use client";

import { useRouter } from "next/navigation";
import { login } from "@/utils/axios";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { signIn } from "next-auth/react";

const Login = ({ searchParams }: { searchParams: { callbackUrl: string } }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const body = { email: email };
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/is-allowed-to-sign-in`,
        body,
        { withCredentials: true }
      );
      const signInPromise = signIn("email", {
        email: email,
        callbackUrl: searchParams.callbackUrl,
      });
      toast.promise(signInPromise, {
        pending: "Enviando...",
        success: "Redirigiendo...",
        error: "Ups, ha habido un error",
      });
      await signInPromise;
      router.push("/api/auth/verify-request");
    } catch (error) {
      console.error(error);
      toast.error("Login falló. Reintentar...");
    }
  };

  function handleChange(event: any) {
    setEmail(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit} className="login-signup">
      <h1 className="form-title">Entrar</h1>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Email registrado"
        onChange={handleChange}
        required
      />

      <br />
      <div className="flex flex-col justify-center space-y-2">
        <button
          className="submit-button form-button"
          type="submit"
          value="login"
        >
          <h3 className="text-xl">Entrar con Email</h3>
        </button>
        <Link className="self-center" href="/registrarse">
          <h3 className="text-xl underline">Registrarse</h3>
        </Link>
      </div>
    </form>
  );
};

export default Login;

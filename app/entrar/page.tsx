"use client";

import { useRouter } from "next/navigation";
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
        pending: "Cargando...",
        success: "Redirigiendo...",
        error: "Ups, ha habido un error",
      });
      await signInPromise;
      router.push("/api/auth/verify-request");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error);
        if (error.response?.status === 404) {
          toast.error("Email no registrado, redirigiendo...");
          setTimeout(() => {
            router.push("/registrarse");
          }, 2000);
        } else {
          toast.error("Login falló. Reintentar...");
        }
      }
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

        <div className="flex justify-center space-x-1 mb-2">
          <h3>¿No estás registradx? </h3>
          <Link className="link" href="/registrarse">
            Registrarse
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Login;

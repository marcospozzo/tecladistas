"use client";

import { Button } from "@/components/ui/Button";
import Field from "@/components/ui/Field";
import FormShell from "@/components/ui/FormShell";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { signIn } from "next-auth/react";

const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = { email: email };
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/is-allowed-to-sign-in`,
        body,
        { withCredentials: true },
      );
      const signInPromise = signIn("email", {
        email: email,
        callbackUrl: searchParams.get("callbackUrl") ?? "/",
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

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  return (
    <FormShell
      description="Ingresá el email con el que te registraste, para recibir el link de acceso."
      eyebrow="Acceso"
      size="narrow"
      title="Entrar"
    >
      <form className="ui-form-grid" onSubmit={handleSubmit}>
        <Field htmlFor="email">
          <input
            className="ui-input"
            id="email"
            name="email"
            onChange={handleChange}
            placeholder="Email registrado"
            required
            type="email"
          />
        </Field>

        <div className="ui-form-actions">
          <Button fullWidth type="submit">
            Entrar con Email
          </Button>
        </div>

        <div className="text-center text-sm text-slate-600 dark:text-slate-300">
          ¿No estás registradx?{" "}
          <Link className="font-semibold underline" href="/registrarse">
            Registrarse
          </Link>
        </div>
      </form>
    </FormShell>
  );
};

export default Login;

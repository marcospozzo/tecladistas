// "use client";

import { useRouter } from "next/navigation";
import { login } from "@/utils/axios";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

const Login = ({ searchParams }: { searchParams: { from: string } }) => {
  const router = useRouter();
  console.log(searchParams.from);

  const [credentials, setCredentials] = useState({});

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      await login(credentials);
      router.push("/clasificados");
    } catch (error) {
      console.error(error);
      toast.error("Login falló. Reintentar...");
    }
  };

  function handleChange(event: { target: { name: any; value: any } }) {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="login-signup">
      <h1 className="form-title">Entrar</h1>
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

      <br />
      <div className="flex flex-col justify-center space-y-2">
        <button
          className="submit-button form-button"
          type="submit"
          value="login"
        >
          <h3 className="text-xl">Entrar</h3>
        </button>
        <Link className="self-center" href="/crear-cuenta">
          <h3 className="text-xl underline">Registrarse</h3>
        </Link>
        <Link className="self-center" href="/reset">
          <h2 className="text-base">Olvidé contraseña</h2>
        </Link>
      </div>
    </form>
  );
};

export default Login;

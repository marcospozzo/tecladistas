import Link from "next/link";

const Login = () => {
  return (
    <form className="login-signup" action="#" method="post">
      <h1 className="form-title">Entrar</h1>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        required
      />
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Contraseña"
        required
      />

      <br />
      <div className="flex flex-col justify-center space-y-2">
        <button className="submit-button" type="submit" value="login">
          <h3 className="text-xl">Entrar</h3>
        </button>
        <Link className="self-center" href="/crear-cuenta">
          <h3 className="text-xl underline">Registrarse</h3>
        </Link>
        <Link className="self-center" href="/reset">
          <h2 className="text-xl">Olvidé contraseña</h2>
        </Link>
      </div>
    </form>
  );
};

export default Login;

const SignUp = () => {
  return (
    <form className="login-signup" action="#" method="post">
      <h1 className="form-title">Crear cuenta</h1>
      <input
        type="text"
        id="firstName"
        name="firstName"
        placeholder="Nombre"
        required
      />
      <input
        type="text"
        id="lastName"
        name="lastName"
        placeholder="Apellido"
        required
      />
      <input
        type="text"
        id="phone"
        name="phone"
        placeholder="Celular (Ej.: 5491122334455)"
        required
      />
      <i className="self-center text-center">
        Solo números, con prefijo de país, sin espacios ni guiones
      </i>
      <br />
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
      <button className="submit-button" type="submit" value="create">
        <h3 className="text-xl">Crear cuenta</h3>
      </button>
    </form>
  );
};

export default SignUp;

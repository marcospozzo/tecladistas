const Reset = () => {
  return (
    <form className="login-signup" action="#" method="post">
      <h1 className="form-title">Reiniciar contraseña</h1>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        required
      />

      <br />
      <div className="flex flex-col justify-center space-y-2">
        <button
          className="submit-button form-button"
          type="submit"
          value="login"
        >
          <h3 className="text-xl">Reiniciar</h3>
        </button>
      </div>
    </form>
  );
};

export default Reset;

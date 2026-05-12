import { useState } from "react";
import "../styles/auth.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const validate = () => {
    if (!email) return "El correo es obligatorio";
    if (!email.includes("@")) return "Correo inválido";
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const error = validate();
    if (error) {
      setMessage(error);
      return;
    }

    // simulación (sin backend)
    setMessage("Si el correo existe, recibirás instrucciones ");
  };

  return (
    <div className="auth-page d-flex justify-content-center align-items-center">
      <div className="auth-container w-100" style={{ maxWidth: "400px" }}>
        <h2 className="mb-3">Recuperar contraseña</h2>

        <form onSubmit={handleSubmit} className="w-100">
          <input
            type="email"
            placeholder="Ingresa tu correo"
            className="form-control mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button type="submit" className="button w-100 mt-2">
            Enviar
          </button>
        </form>

        {message && <p className="error mt-3">{message}</p>}

        <p className="mt-3">
          ¿Recordaste tu contraseña?{" "}
          <a href="/" className="auth-link">
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;

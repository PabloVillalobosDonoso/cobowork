import "../styles/formulario.css";
import { useState } from "react";

const initialForm = {
  nombre: "",
  email: "",
  mensaje: "",
};

const Formulario = () => {
  const [form, setForm] = useState(initialForm);
  const [estado, setEstado] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    setEstado("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nombre = form.nombre.trim();
    const email = form.email.trim();
    const mensaje = form.mensaje.trim();

    if (!nombre || !email || !mensaje) {
      setEstado("error");
      return;
    }

    if (!emailValido.test(email)) {
      setEstado("email_error");
      return;
    }

    setEstado("success");
    console.log({ nombre, email, mensaje });
    setForm(initialForm);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h2 className="contact-title">Formulario de Contacto</h2>
      <p className="contact-subtitle">Te respondemos a la brevedad.</p>

      <div className="contact-field">
        <label className="contact-label" htmlFor="nombre">
          Nombre*
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          autoComplete="name"
          placeholder="Tu nombre completo"
          value={form.nombre}
          onChange={handleChange}
          className="contact-input"
        />
      </div>

      <div className="contact-field">
        <label className="contact-label" htmlFor="email">
          Correo electrónico*
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="tu@email.com"
          value={form.email}
          onChange={handleChange}
          className="contact-input"
        />
      </div>

      <div className="contact-field">
        <label className="contact-label" htmlFor="mensaje">
          Mensaje*
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          placeholder="Escribe tu mensaje..."
          value={form.mensaje}
          onChange={handleChange}
          className="contact-textarea"
        />
      </div>

      {estado === "error" && (
        <p className="contact-error" aria-live="polite">
          Todos los campos son obligatorios
        </p>
      )}
      {estado === "email_error" && (
        <p className="contact-error" aria-live="polite">
          Correo inv�lido
        </p>
      )}
      {estado === "success" && (
        <p className="contact-success" aria-live="polite">
          Mensaje enviado correctamente
        </p>
      )}

      <button type="submit" className="contact-button">
        Enviar mensaje
      </button>
    </form>
  );
};

export default Formulario;

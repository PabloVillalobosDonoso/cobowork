import "../styles/formulario.css";
import Formulario from "../components/Formulario";

const Contacto = () => {
  return (
    <section className="contact-page">
      <div className="contact-content">
        <h1 className="contact-heading">Atención al Cliente</h1>
        <p className="contact-intro">¿Tienes dudas? Escríbenos</p>
        <Formulario />
      </div>
    </section>
  );
};

export default Contacto;

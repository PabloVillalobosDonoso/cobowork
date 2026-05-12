import Navbar from "../components/Navbar";
import Footer from "../components/footer/Footer";
import "../styles/about.css";

const About = () => {
  return (
    <>
      <section className="about-section">
        <div className="container position-relative">
          {/* Card Blanca */}
          <div className="about-card-container">
            <div className="row align-items-center">
              {/* Texto */}
              <div className="col-lg-6 mb-5 mb-lg-0">
                <div className="about-content">
                  <span className="about-tag">Espacios colaborativos</span>

                  <h1 className="about-title">Quiénes Somos</h1>

                  <p className="about-text">
                    En <strong>CoboWork</strong> creemos que los espacios de
                    trabajo deben inspirar creatividad, productividad y conexión
                    entre personas.
                  </p>

                  <p className="about-text">
                    Diseñamos ambientes modernos y cómodos para freelancers,
                    startups y empresas que buscan desarrollar sus proyectos en
                    un entorno profesional y flexible.
                  </p>

                  <p className="about-text">
                    Más que oficinas, construimos una comunidad donde nacen
                    nuevas ideas, colaboraciones y oportunidades.
                  </p>

                  {/* Estadísticas */}
                  <div className="row mt-4">
                    <div className="col-4">
                      <h3 className="stats-number">+120</h3>
                      <p className="stats-text">Clientes</p>
                    </div>

                    <div className="col-4">
                      <h3 className="stats-number">24/7</h3>
                      <p className="stats-text">Acceso</p>
                    </div>

                    <div className="col-4">
                      <h3 className="stats-number">5★</h3>
                      <p className="stats-text">Valoración</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Imagen */}
              <div className="col-lg-6 text-center">
                <img
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop"
                  alt="Cowork moderno"
                  className="about-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;

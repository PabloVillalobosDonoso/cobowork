//import { espacios } from "../data/espacios";
import Card from "../components/Card";
import { useState, useEffect } from "react";
import ReservaModal from "../components/ReservaModal";
import { useLocation } from "react-router";
import { motion } from "framer-motion";
import Lugares from "../components/lugares/Lugares";
import "../styles/global.css";
import "../styles/espacios.css";
import { obtenerEspacios } from "../../api";
import { useAuth, AUTH_ACTIONS  } from "../context/AuthContext";


const Espacios = () => {
  const { state } = useAuth();
  const [selectedEspacio, setSelectedEspacio] = useState(null);
  const location = useLocation();
  const [espacios, setEspacios] = useState([]);

  //cargar espacios con api
  useEffect(() => {
    if(!state.token){
      return;
    } 
    obtenerEspacios().then(setEspacios)
  }, [state.token]);

  // Obtener filtro desde URL
  const params = new URLSearchParams(location.search);
  const ubicacion = params.get("ubicacion");

  //filtrado de espacios por ubicacion
  const espaciosFiltrados = ubicacion
    ? espacios.filter((e) => e.ubicacion.toLowerCase() === ubicacion.toLowerCase())
    : espacios;

  const esUno = espaciosFiltrados.length === 1;

  const handleReservar = (espacio) => {
    setSelectedEspacio(espacio);
  };

  return (
    <main className="main-content">
      <section className="espacios">
        <div className="container ">
          {/* HEADER */}
          <div className="text-center mb-4 titulo-espacios">
            <h2 className="display-5 fw-bold text-light">Nuestros Espacios</h2>
            <hr className="border-light opacity-50" />
            <Lugares espacios={espacios}/>
            <h3 className="text-white">
              {ubicacion
                ? `Espacios en ${ubicacion}`
                : "Elige el espacio que mejor se adapte a tus necesidades"}
            </h3>
          </div>

          {/* GRID con animacion*/}
          <div className="row g-4 justify-content-center">
            {espaciosFiltrados.map((espacio) => (
              <motion.div
                key={espacio._id}
                className={
                  esUno
                    ? "col-12 col-md-6 col-lg-8"
                    : "col-12 col-md-6 col-lg-4"
                }
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Card espacio={espacio} onReservar={handleReservar} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL */}
      <ReservaModal
        espacio={selectedEspacio}
        onClose={() => setSelectedEspacio(null)}
      />
    </main>
  );
};

export default Espacios;

/*grid antiguo(sin animacion)
{espacios.map((espacio) => (
              <Card
                key={espacio.id}
                espacio={espacio}
                onReservar={handleReservar}
              />
            ))}
              */

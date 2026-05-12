import { useState, useEffect } from "react";
//import { getReservasByEmail } from "../services/reservaService";
import ReservaCard from "../components/ReservaCard";
import "../styles/reservas.css";
import { obtenerReservas } from "../../api"
import { useAuth, AUTH_ACTIONS  } from "../context/AuthContext";

const TABS = [
  { key: "historial", label: "Historial" },
  { key: "activa", label: "Activas" },
  { key: "cancelada", label: "Canceladas" },
];

const MisReservas = () => {
  const { state } = useAuth();
  const [reservas, setReservas] = useState([]);
  const [tabActiva, setTabActiva] = useState("historial");

  const cargarReservas = () => {
    obtenerReservas(state.usuario.id).then(setReservas);
  }
  
  useEffect(() => {
    if(!state.token) return;
    cargarReservas();
  }, [state.token]);

  // const storedUser = localStorage.getItem("user");
  // const user = storedUser ? JSON.parse(storedUser) : null;

  // // const cargarReservas = () => {
  // //   if (!user?.email) return;
  // //   const data = getReservasByEmail(user.email);
  // //   setReservas(data);
  // // };

  // // useEffect(() => {
  // //   cargarReservas();
  // // }, []);

  const reservasFiltradas =
    tabActiva === "historial"
      ? reservas
      : reservas.filter((r) => r.estado === tabActiva);

  return (
    <section className="mis-reservas-section">
      <div className="container">
        <div className="text-center mb-5 titulo-reservas">
          <h2 className="display-5 fw-bold text-white">Mis Reservas</h2>

          <hr className="divider-reservas" />

          <h3 className="subtitle-reservas">
            Revisa el estado de tus reservas
          </h3>
        </div>

        {/* TABS */}
        <div className="tabs-container">
          <ul className="nav nav-tabs custom-tabs">
            {TABS.map((tab) => (
              <li className="nav-item" key={tab.key}>
                <button
                  className={`nav-link ${
                    tabActiva === tab.key ? "active" : ""
                  }`}
                  onClick={() => setTabActiva(tab.key)}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTENIDO */}
        {reservasFiltradas.length === 0 ? (
          <div className="empty-reservas">No hay reservas en esta sección.</div>
        ) : (
          <div className="row g-4">
            {reservasFiltradas.map((reserva) => (
              <div className="col-12 col-md-6 col-xl-4" key={reserva._id}>
                <ReservaCard reserva={reserva} onActualizar={cargarReservas} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MisReservas;

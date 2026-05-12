//import { cancelarReserva } from "../services/reservaService";
import { cancelarReserva } from "../../api";

const estadoBadge = {
  activa: { label: "Activa", clase: "badge bg-success" },
  cancelada: { label: "Cancelada", clase: "badge bg-danger" },
};

const ReservaCard = ({ reserva, onActualizar }) => {
  const badge = estadoBadge[reserva.estado] || {
    label: reserva.estado,
    clase: "badge bg-secondary",
  };

  // const formatearFecha = (fecha) => {
  //   const [año, mes, dia] = fecha.split("-");
  //   return `${dia}/${mes}/${año}`;
  // };

  const handleCancelar = async () => {
    if (window.confirm("¿Cancelar esta reserva?")) {
      const nuevoEstado = { nuevoEstado: "cancelada"}
      await cancelarReserva(reserva._id, nuevoEstado);
      onActualizar();
    }
  };

  return (
    <div
      className="card shadow-sm border-0 h-100"
      style={{ minWidth: "220px" }}
    >
      <div className="card-body d-flex flex-column gap-2">
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ flexWrap: "wrap", gap: "8px" }}
        >
          <h5 className="card-title mb-0">{reserva.idEspacio.nombre}</h5>
          <span className={badge.clase}>{badge.label}</span>
        </div>

        <p className="mb-0 text-muted">
          <i className="bi bi-calendar3 me-1"></i>
          {reserva.fecha} — Hora: {reserva.horaInicio}
        </p>

        <p className="mb-0 text-muted">
          <i className="bi bi-person me-1"></i>
          {reserva.idUsuario.nombre}
        </p>

        <p className="mb-0 text-muted">
          <i className="bi bi-envelope me-1"></i>
          {reserva.idUsuario.correo}
        </p>

        <p className="mb-0 text-muted">
          <i className="bi bi-telephone me-1"></i>
          {reserva.idUsuario.numero}
        </p>

        {reserva.estado === "activa" && (
          <button
            className="btn btn-outline-danger btn-sm mt-auto"
            onClick={handleCancelar}
          >
            Cancelar reserva
          </button>
        )}
      </div>
    </div>
  );
};

export default ReservaCard;

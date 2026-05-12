const KEY = "reservas";

export const getReservas = () => {
  return JSON.parse(localStorage.getItem(KEY)) || [];
};

export const getReservasByEmail = (email) => {
  return getReservas().filter((r) => r.email === email);
};

export const crearReserva = (reserva) => {
  const reservas = getReservas();
  const nueva = {
    id: Date.now(),
    ...reserva,
    estado: "activa",
    creadaEn: new Date().toISOString(),
  };
  reservas.push(nueva);
  localStorage.setItem(KEY, JSON.stringify(reservas));
};

export const cancelarReserva = (id) => {
  const reservas = getReservas().map((r) =>
    r.id === id ? { ...r, estado: "cancelada" } : r,
  );
  localStorage.setItem(KEY, JSON.stringify(reservas));
};

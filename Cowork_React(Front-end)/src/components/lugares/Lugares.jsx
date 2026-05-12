//import { espacios } from "../../data/espacios";
import Lugar from "../lugares/Lugar";
import { useNavigate, useLocation } from "react-router";

const Lugares = ({espacios}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Obtener filtro desde URL
  const params = new URLSearchParams(location.search);
  const lugarActivo = params.get("ubicacion");

  const lugaresUnicos = [...new Set(espacios.map((e) => e.ubicacion))];

  const handleClick = (ubicacion) => {
    if (lugarActivo === ubicacion) {
      navigate("/espacios"); // si ya esta activo, quita el filtro
    } else {
      navigate(`/espacios?ubicacion=${encodeURIComponent(ubicacion)}`);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row g-3 justify-content-center">
          {lugaresUnicos.map((ubicacion, i) => (
            <Lugar
              key={i}
              ubicacion={ubicacion}
              onClick={handleClick}
              isActive={lugarActivo === ubicacion}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Lugares;

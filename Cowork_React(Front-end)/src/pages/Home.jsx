import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // limpia datos
    navigate("/"); // vuelve al login
  };

  return (
    <div className="container h-100 d-flex justify-content-center align-items-center">
      <div
        className="auth-container w-100 text-center"
        style={{ maxWidth: "400px" }}
      >
        <h2 className="mb-4">Bienvenido 👋</h2>

        <button onClick={handleLogout} className="logout-btn w-100">
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Home;

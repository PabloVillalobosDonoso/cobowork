import { useState } from "react";
//import { login } from "../services/authService";
import "../styles/auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, AUTH_ACTIONS  } from "../context/AuthContext";
import { iniciarSesion } from "../../api";

const Login = () => {
  const { dispatch } = useAuth();
  const [form, setForm] = useState({ correo: "", constraseña: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    if (!form.correo || !form.constraseña) {
      return "Todos los campos son obligatorios";
    }

    if (!form.correo.includes("@")) {
      return "Correo inválido";
    }

    if (form.constraseña.length < 6) {
      return "constraseña incorrecta";
    }

    return null;
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try{
      const result = await iniciarSesion(form.correo, form.constraseña);
      // Decodificar el payload del JWT para obtener los datos del usuario
      const payload = JSON.parse(atob(result.token.split(".")[1]));

      dispatch({
        type: AUTH_ACTIONS.LOGIN,
        payload: {
          token: result.token,
          usuario: { id: payload.id, correo: payload.correo, rol: payload.rol, nombre: payload.nombre, numero: payload.numero},
        },
      });
      navigate("/espacios");
    }catch(err){
      setError(err.message || "Error al iniciar sesión");
    }

    // const result = iniciarSesion(form.correo, form.constraseña);

    // if (!result.success || !result.user) {
    //   setError(result.message || "Error al iniciar sesión");
    // } else {
    //   localStorage.setItem("user", JSON.stringify(result.user));
    //   navigate("/espacios");
    // }
  };

  return (
    <div className="auth-page d-flex justify-content-center align-items-center">
      <div className="auth-container w-100" style={{ maxWidth: "400px" }}>
        <h2 className="mb-3">Autentificación</h2>

        <form onSubmit={handleSubmit} className="w-100">
          <input
            type="email"
            name="correo"
            placeholder="Correo"
            className="form-control mb-3"
            onChange={handleChange}
          />

          <input
            type="password"
            name="constraseña"
            placeholder="constraseña"
            className="form-control mb-3"
            onChange={handleChange}
          />

          <button type="submit" className="button w-100 mt-2">
            Iniciar Sesión
          </button>
        </form>

        {error && <p className="error mt-3">{error}</p>}

        <p className="mt-3">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="auth-link">
            Regístrate
          </Link>
        </p>

        <p>
          <Link to="/forgot-password" className="auth-link">
            ¿Olvidaste tu constraseña?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
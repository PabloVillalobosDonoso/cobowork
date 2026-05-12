import { useState } from "react";
//import { register } from "../services/authService";
import "../styles/auth.css";
import { Link } from "react-router-dom";
import { registro, iniciarSesion } from "../../api.js";
import { useAuth, AUTH_ACTIONS  } from "../context/AuthContext";

const Register = () => {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    numero: "",
    constraseña: "",
    confirmPassword: "",
  });
  const { dispatch } = useAuth();
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    if (
      !form.nombre ||
      !form.apellido ||
      !form.correo ||
      !form.numero ||
      !form.constraseña ||
      !form.confirmPassword
    ) {
      return "Todos los campos son obligatorios";
    }

    if (!form.correo.includes("@")) {
      return "Correo inválido";
    }

    if (form.constraseña.length < 6) {
      return "Mínimo 6 caracteres en la contraseña";
    }

    if (form.constraseña !== form.confirmPassword) {
      return "Las contraseñas no coinciden";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      console.log(error);
      setMessage(error);
      return;
    }

    try{
      await registro(form.nombre, form.apellido, form.numero, form.correo, form.constraseña);
      setMessage("Cuenta creada correctamente 🎉");
      const data = await iniciarSesion(form.correo, form.constraseña);
      const payload = JSON.parse(atob(data.token.split(".")[1]));
      dispatch({
        type: AUTH_ACTIONS.LOGIN,
        payload: {
          token: data.token,
          usuario: { id: payload.id, correo: payload.correo, rol: payload.rol },
        }
      })

    }catch(err){
      setMessage(err.message)
    }

    // const result = register(
    //   form.nombre,
    //   form.apellido,
    //   form.correo,
    //   form.numero,
    //   form.constraseña,
    // );

    // if (!result.success) {
    //   setMessage(result.message);
    // } else {
    //   setMessage("Cuenta creada correctamente 🎉");
    // }
  };

  return (
    <div className="auth-page d-flex justify-content-center align-items-center">
      <div className="auth-container w-100" style={{ maxWidth: "420px" }}>
        <h2 className="mb-3">Crear Cuenta</h2>

        <form onSubmit={handleSubmit} className="w-100">
          <div className="row">
            <div className="col-12 col-md-6">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                className="form-control mb-3"
                onChange={handleChange}
              />
            </div>

            <div className="col-12 col-md-6">
              <input
                type="text"
                name="apellido"
                placeholder="Apellido"
                className="form-control mb-3"
                onChange={handleChange}
              />
            </div>
          </div>

          <input
            type="email"
            name="correo"
            placeholder="Correo"
            className="form-control mb-3"
            onChange={handleChange}
          />

          <input
            type="text"
            name="numero"
            placeholder="Teléfono"
            className="form-control mb-3"
            onChange={handleChange}
          />

          <input
            type="password"
            name="constraseña"
            placeholder="Contraseña"
            className="form-control mb-3"
            onChange={handleChange}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar Contraseña"
            className="form-control mb-3"
            onChange={handleChange}
          />

          <button type="submit" className="button w-100 mt-2">
            Registrarse
          </button>
        </form>

        {message && <p className="error mt-3">{message}</p>}

        <p className="mt-3">
          ¿Ya tienes cuenta?{" "}
          <Link to="/" className="auth-link">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

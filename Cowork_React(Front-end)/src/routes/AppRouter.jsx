import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout";
import Espacios from "../pages/Espacios";
import Contacto from "../pages/Contacto";
import MisReservas from "../pages/MisReservas";
import About from "../pages/About";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/*Rutas Publicas*/}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/*Rutas Privadas */}
        <Route element={<MainLayout />}>
          <Route path="/mis-reservas" element={<MisReservas />} />
          <Route path="/home" element={<Navigate to="/espacios" />} />
          <Route path="/espacios" element={<Espacios />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

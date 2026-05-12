import { NavLink } from "react-router-dom";
import logo from "../../assets/img/cobowork.png";

const FooterBrand = () => {
  return (
    <div className="col-md-4 mb-3 mb-md-0 footer-brand">
      <NavLink className="text-decoration-none" to="/home">
        <img src={logo} alt="CoWork logo" className="logo-navbar" />
      </NavLink>

      <p className="text-muted mt-2">Tu espacio de trabajo ideal</p>
    </div>
  );
};

export default FooterBrand;

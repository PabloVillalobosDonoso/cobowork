import FooterBrand from "./FooterBrand";
import FooterContact from "./FooterContact";
import FooterSocial from "./FooterSocial";
import "../../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer mt-auto py-4 bg-dark text-white text-center">
      <div className="container">
        <div className="row">
          <FooterBrand />
          <FooterContact />
          <FooterSocial />
        </div>

        <hr className="my-3" />

        <div className="text-center">
          <span className="text-muted">
            &copy; {new Date().getFullYear()} CoboWork. Todos los derechos
            reservados.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

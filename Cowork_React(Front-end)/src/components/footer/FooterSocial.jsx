const FooterSocial = () => {
  return (
    <div className="col-md-4">
      <h6>Síguenos</h6>
      <div className="social-links">
        <a
          href="https://www.facebook.com/"
          className="text-muted me-3"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="bi bi-facebook fs-4"></i>
        </a>
        <a
          href="https://www.instagram.com/"
          className="text-muted me-3"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="bi bi-instagram fs-4"></i>
        </a>
        <a
          href="https://www.linkedin.com/"
          className="text-muted"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="bi bi-linkedin fs-4"></i>
        </a>
      </div>
    </div>
  );
};

export default FooterSocial;

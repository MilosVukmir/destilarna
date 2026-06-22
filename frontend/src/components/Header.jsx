import logoIcon from "../assets/icons/logo2.png";

function Header() {
  return (
    <nav className="navbar navbar-dark bg-dark px-4 app-header">
      <div className="d-flex align-items-center">
    <img
      src={logoIcon}
      alt="Logo"
      className="header-logo"
    />

    <span className="navbar-brand mb-0 ms-3 app-title">
      Destilarna Vukmir
    </span>
  </div>

      <div className="d-flex align-items-center">
        <span className="text-light me-3">
          Administrator
        </span>

        <button className="btn btn-outline-light btn-sm">
          Odjava
        </button>
      </div>
    </nav>
  );
}

export default Header;
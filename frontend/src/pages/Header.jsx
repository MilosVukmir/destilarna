import logoIcon from "../assets/icons/logo2.png";

function Header() {

  const user = JSON.parse(localStorage.getItem("user"));

  const odjava = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
};

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
        <span className="text-light me-3" >
          {user?.vloga === "administrator" ? "Administrator" : "Zaposleni"}
        </span>

        <button className="btn btn-outline-light btn-sm" onClick={odjava}>
          Odjava
        </button>
      </div>
    </nav>
  );
}

export default Header;
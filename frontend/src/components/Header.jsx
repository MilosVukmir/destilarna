function Header() {
  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <span className="navbar-brand mb-0 h1">
        Destilarna Vukmir
      </span>

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
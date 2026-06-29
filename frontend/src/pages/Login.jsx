import { useState } from "react";
import { API_URL } from "../config/api.js";
import logoIcon from "../assets/icons/logo2.png";

function Login() {
  const [uporabniskoIme, setUporabniskoIme] = useState("");
  const [geslo, setGeslo] = useState("");

  const prijava = async (e) => {
    e.preventDefault();

    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uporabnisko_ime: uporabniskoIme,
        geslo: geslo,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(data));
      window.location.href = "/";
    } else {
      alert(data.sporocilo);
    }
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={prijava}>
        <img
              src={logoIcon}
              alt="Logo"
              className="login-logo"
            />
        <h2 className="login-naslov"><b>Destilarna Vukmir</b></h2>
        <p className="login-subtitle">Prijavite se v svoj račun</p>

        <div className="mb-3">
          <label className="form-label login-label">Uporabniško ime</label>
          <input
            className="form-control"
            type="text"
            value={uporabniskoIme}
            onChange={(e) => setUporabniskoIme(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label login-label">Geslo</label>
          <input
            className="form-control"
            type="password"
            value={geslo}
            onChange={(e) => setGeslo(e.target.value)}
          />
        </div>

        <button className="btn-add w-100" type="submit">
          Prijava
        </button>
      </form>
    </div>
  );
}

export default Login;
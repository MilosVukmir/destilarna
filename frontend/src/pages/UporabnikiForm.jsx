function UporabnikiForm({
  noviUporabnik,
  setNoviUporabnik,
  onSubmit,
  onCancel,
  urejanjeId,
}) {
  return (
    <div className="modal-overlay">
      <div className="form-modal">
        <h2 className="form-title">
          {urejanjeId ? "Uredi uporabnika" : "Dodaj uporabnika"}
        </h2>

        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">Uporabniško ime</label>
            <input
              className="form-control"
              type="text"
              value={noviUporabnik.uporabnisko_ime}
              onChange={(e) =>
                setNoviUporabnik({
                  ...noviUporabnik,
                  uporabnisko_ime: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Ime</label>
            <input
              className="form-control"
              type="text"
              value={noviUporabnik.ime}
              onChange={(e) =>
                setNoviUporabnik({
                  ...noviUporabnik,
                  ime: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Telefon</label>
            <input
              className="form-control"
              type="text"
              value={noviUporabnik.telefon}
              onChange={(e) =>
                setNoviUporabnik({
                  ...noviUporabnik,
                  telefon: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">E-naslov</label>
            <input
              className="form-control"
              type="text"
              value={noviUporabnik.e_naslov}
              onChange={(e) =>
                setNoviUporabnik({
                  ...noviUporabnik,
                  e_naslov: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Geslo</label>
            <input
              className="form-control"
              type="password"
              value={noviUporabnik.geslo}
              onChange={(e) =>
                setNoviUporabnik({
                  ...noviUporabnik,
                  geslo: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Vloga</label>
            <select
              className="form-control"
              value={noviUporabnik.vloga}
              onChange={(e) =>
                setNoviUporabnik({
                  ...noviUporabnik,
                  vloga: e.target.value,
                })
              }>
                <option value="">Izberi vlogo</option>
                <option value="administrator">Administrator</option>
                <option value="zaposleni">Zaposleni</option>
            </select>
          </div>

          <div className="d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Prekliči
            </button>

            <button type="submit" className="btn btn-add-modal">
              {urejanjeId ? "Shrani" : "Dodaj"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UporabnikiForm;
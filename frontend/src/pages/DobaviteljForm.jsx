function DobaviteljForm({
  noviDobavitelj,
  setNoviDobavitelj,
  onSubmit,
  onCancel,
  urejanjeId,
}) {
  return (
    <div className="modal-overlay">
      <div className="form-modal">
        <h2 className="form-title">
          {urejanjeId ? "Uredi dobavitelja" : "Dodaj dobavitelja"}
        </h2>

        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">Ime ali naziv</label>
            <input
              className="form-control"
              type="text"
              value={noviDobavitelj.ime_ali_naziv}
              onChange={(e) =>
                setNoviDobavitelj({
                  ...noviDobavitelj,
                  ime_ali_naziv: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Kontaktna oseba</label>
            <input
              className="form-control"
              type="text"
              value={noviDobavitelj.kontakt_oseba}
              onChange={(e) =>
                setNoviDobavitelj({
                  ...noviDobavitelj,
                  kontakt_oseba: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Telefon</label>
            <input
              className="form-control"
              type="text"
              value={noviDobavitelj.telefon}
              onChange={(e) =>
                setNoviDobavitelj({
                  ...noviDobavitelj,
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
              value={noviDobavitelj.e_naslov}
              onChange={(e) =>
                setNoviDobavitelj({
                  ...noviDobavitelj,
                  e_naslov: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Naslov</label>
            <input
              className="form-control"
              type="text"
              value={noviDobavitelj.naslov}
              onChange={(e) =>
                setNoviDobavitelj({
                  ...noviDobavitelj,
                  naslov: e.target.value,
                })
              }
            />
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

export default DobaviteljForm;
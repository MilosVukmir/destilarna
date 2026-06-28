function SadjeForm({
  novoSadje,
  setNovoSadje,
  onSubmit,
  onCancel,
  urejanjeId,
}) {
  return (
    <div className="modal-overlay">
      <div className="form-modal">
        <h2 className="form-title">
          {urejanjeId ? "Uredi sadje" : "Dodaj sadje"}
        </h2>

        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">Naziv</label>
            <input
              className="form-control"
              type="text"
              value={novoSadje.naziv}
              onChange={(e) =>
                setNovoSadje({
                  ...novoSadje,
                  naziv: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Sorta</label>
            <input
              className="form-control"
              type="text"
              value={novoSadje.sorta}
              onChange={(e) =>
                setNovoSadje({
                  ...novoSadje,
                  sorta: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Opis</label>
            <input
              className="form-control"
              type="text"
              value={novoSadje.opis}
              onChange={(e) =>
                setNovoSadje({
                  ...novoSadje,
                  opis: e.target.value,
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

export default SadjeForm;
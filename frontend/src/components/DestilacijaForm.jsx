function DestilacijaForm({
  novaDestilacija,
  setNovaDestilacija,
  fermentacije,
  serijeZganja,
  onSubmit,
  onCancel,
  urejanjeId,
}) {
  return (
    <div className="modal-overlay">
      <div className="form-modal">
        <h2 className="form-title">
          {urejanjeId ? "Uredi destilacijo" : "Dodaj destilacijo"}
        </h2>

        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">Fermentacija</label>
            <select
              className="form-control"
              value={novaDestilacija.fermentacija_id}
              onChange={(e) =>
                setNovaDestilacija({
                  ...novaDestilacija,
                  fermentacija_id: e.target.value,
                })
              }
            >
              <option value="">Izberi fermentacijo</option>

              {fermentacije.map((ferm) => (
                <option key={ferm.id} value={ferm.id}>
                  {ferm.sadje} ({ferm.sorta}) - {ferm.posoda}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Serija žganja</label>
            <select
              className="form-control"
              value={novaDestilacija.serija_zganja_id}
              onChange={(e) =>
                setNovaDestilacija({
                  ...novaDestilacija,
                  serija_zganja_id: e.target.value,
                })
              }
            >
              <option value="">Izberi serijo</option>

              {serijeZganja.map((serija) => (
                <option key={serija.id} value={serija.id}>
                  {serija.naziv_serije}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Datum destilacije</label>
            <input
              className="form-control"
              type="date"
              value={novaDestilacija.datum_destilacije}
              onChange={(e) =>
                setNovaDestilacija({
                  ...novaDestilacija,
                  datum_destilacije: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Tip destilacije</label>
            <select
              className="form-control"
              value={novaDestilacija.tip_destilacije}
              onChange={(e) =>
                setNovaDestilacija({
                  ...novaDestilacija,
                  tip_destilacije: e.target.value,
                })
              }
            >
              <option value="">Izberi tip</option>
              <option value="prva">Prva</option>
              <option value="druga">Druga</option>
              <option value="tretja">Tretja</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Jakost alkohola</label>
            <input
              className="form-control"
              type="number"
              step="0.1"
              value={novaDestilacija.jakost_alkohola}
              onChange={(e) =>
                setNovaDestilacija({
                  ...novaDestilacija,
                  jakost_alkohola: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Pridobljena količina (l)</label>
            <input
              className="form-control"
              type="number"
              step="0.1"
              value={novaDestilacija.pridobljena_kolicina_l}
              onChange={(e) =>
                setNovaDestilacija({
                  ...novaDestilacija,
                  pridobljena_kolicina_l: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Opomba</label>
            <textarea
              className="form-control"
              value={novaDestilacija.opomba}
              onChange={(e) =>
                setNovaDestilacija({
                  ...novaDestilacija,
                  opomba: e.target.value,
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

export default DestilacijaForm;
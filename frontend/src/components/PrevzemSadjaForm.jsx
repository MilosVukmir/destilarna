function PrevzemSadjaForm({
  noviPrevzem,
  setNoviPrevzem,
  dobavitelji,
  sadje,
  onSubmit,
  onCancel,
  urejanjeId,
}) {
  return (
    <div className="modal-overlay">
      <div className="form-modal">
        <h2 className="form-title">
          {urejanjeId ? "Uredi prevzem sadja" : "Dodaj prevzem sadja"}
        </h2>

        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">Dobavitelj</label>
            <select
              className="form-control"
              value={noviPrevzem.dobavitelj_id}
              onChange={(e) =>
                setNoviPrevzem({
                  ...noviPrevzem,
                  dobavitelj_id: e.target.value,
                })
              }
            >
              <option value="">Izberi dobavitelja</option>

              {dobavitelji.map((dobavitelj) => (
                <option key={dobavitelj.id} value={dobavitelj.id}>
                  {dobavitelj.ime_ali_naziv}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Sadje</label>
            <select
              className="form-control"
              value={noviPrevzem.sadje_id}
              onChange={(e) =>
                setNoviPrevzem({
                  ...noviPrevzem,
                  sadje_id: e.target.value,
                })
              }
            >
              <option value="">Izberi sadje</option>

              {sadje.map((voce) => (
                <option key={voce.id} value={voce.id}>
                  {voce.naziv}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Datum prevzema</label>
            <input
              className="form-control"
              type="date"
              value={noviPrevzem.datum_prevzema}
              onChange={(e) =>
                setNoviPrevzem({
                  ...noviPrevzem,
                  datum_prevzema: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Količina (kg)</label>
            <input
              className="form-control"
              type="number"
              value={noviPrevzem.kolicina_kg}
              onChange={(e) =>
                setNoviPrevzem({
                  ...noviPrevzem,
                  kolicina_kg: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Cena na kg</label>
            <input
              className="form-control"
              type="number"
              step="0.01"
              value={noviPrevzem.cena_na_kg}
              onChange={(e) =>
                setNoviPrevzem({
                  ...noviPrevzem,
                  cena_na_kg: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Skupna cena</label>
            <input
              className="form-control"
              type="number"
              step="0.01"
              value={noviPrevzem.skupna_cena}
              onChange={(e) =>
                setNoviPrevzem({
                  ...noviPrevzem,
                  skupna_cena: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Opomba</label>
            <textarea
              className="form-control"
              value={noviPrevzem.opomba}
              onChange={(e) =>
                setNoviPrevzem({
                  ...noviPrevzem,
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

export default PrevzemSadjaForm;
function FermentacijaForm({
  novaFermentacija,
  setNovaFermentacija,
  prevzemiSadja,
  onSubmit,
  onCancel,
  urejanjeId,
}) {
  return (
    <div className="modal-overlay">
      <div className="form-modal">
        <h2 className="form-title">
          {urejanjeId ? "Uredi fermentacijo" : "Dodaj fermentacijo"}
        </h2>

        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">Prevzem sadja</label>
            <select
              className="form-control"
              value={novaFermentacija.prevzem_sadja_id}
              onChange={(e) =>
                setNovaFermentacija({
                  ...novaFermentacija,
                  prevzem_sadja_id: e.target.value,
                })
              }
            >
              <option value="">Izberi prevzem</option>

              {prevzemiSadja.map((prevzem) => (
                <option key={prevzem.id} value={prevzem.id}>
                  {prevzem.sadje} ({prevzem.sorta}) - {prevzem.dobavitelj}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Datum začetka</label>
            <input
              className="form-control"
              type="date"
              value={novaFermentacija.datum_zacetka}
              onChange={(e) =>
                setNovaFermentacija({
                  ...novaFermentacija,
                  datum_zacetka: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Datum zaključka</label>
            <input
              className="form-control"
              type="date"
              value={novaFermentacija.datum_zakljucka}
              onChange={(e) =>
                setNovaFermentacija({
                  ...novaFermentacija,
                  datum_zakljucka: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Posoda</label>
            <input
              className="form-control"
              type="text"
              value={novaFermentacija.posoda}
              onChange={(e) =>
                setNovaFermentacija({
                  ...novaFermentacija,
                  posoda: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Začetna količina (kg)</label>
            <input
              className="form-control"
              type="number"
              step="0.01"
              value={novaFermentacija.zacetna_kolicina_kg}
              onChange={(e) =>
                setNovaFermentacija({
                  ...novaFermentacija,
                  zacetna_kolicina_kg: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Status</label>
            <select
              className="form-control"
              value={novaFermentacija.status}
              onChange={(e) =>
                setNovaFermentacija({
                  ...novaFermentacija,
                  status: e.target.value,
                })
              }
            >
              <option value="">Izberi status</option>
              <option value="v_teku">V teku</option>
              <option value="zakljucena">Zaključena</option>
              <option value="v_pripravi">V pripravi</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="form-label">Opomba</label>
            <textarea
              className="form-control"
              value={novaFermentacija.opomba}
              onChange={(e) =>
                setNovaFermentacija({
                  ...novaFermentacija,
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

export default FermentacijaForm;
function SodiForm({
  noviSod,
  setNoviSod,
  serija_zganja,
  onSubmit,
  onCancel,
  urejanjeId,
}) {
  return (
    <div className="modal-overlay">
      <div className="form-modal">
        <h2 className="form-title">
          {urejanjeId ? "Uredi sod" : "Dodaj sod"}
        </h2>

        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">Serija</label>
            <select
                  className="form-control"
                  value={noviSod.serija_zganja_id}
                  onChange={(e) =>
                    setNoviSod({
                      ...noviSod,
                      serija_zganja_id: e.target.value,
                    })
                  }>
                  <option value="">Izberi serijo</option>

                  {serija_zganja.map((serija) => (
                    <option key={serija.id} value={serija.id}>
                      {serija.naziv_serije}
                    </option>
                  ))}
              </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Oznaka</label>
            <input
              className="form-control"
              type="text"
              value={noviSod.oznaka}
              onChange={(e) =>
                setNoviSod({
                  ...noviSod,
                  oznaka: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Material</label>
            <input
              className="form-control"
              type="text"
              value={noviSod.material}
              onChange={(e) =>
                setNoviSod({
                  ...noviSod,
                  material: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Prostornina</label>
            <input
              className="form-control"
              type="number"
              step="10"
              value={noviSod.prostornina_l}
              onChange={(e) =>
                setNoviSod({
                  ...noviSod,
                  prostornina_l: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Lokacija</label>
            <input
              className="form-control"
              type="text"
              value={noviSod.lokacija}
              onChange={(e) =>
                setNoviSod({
                  ...noviSod,
                  lokacija: e.target.value,
                })
              }
            />
          </div>

           <div className="mb-3">
                    <label className="form-label">Stanje</label>
                    <select className="form-control"
                            value={noviSod.stanje}
                            onChange={(e) =>
                            setNoviSod({...noviSod,
                            stanje: e.target.value,
                        })
                    }>
                    <option value="">Izberi</option>
                    <option value="prazen">Prazen</option>
                    <option value="poln">Poln</option>
                    <option value="okvara">Okvara</option>
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

export default SodiForm;
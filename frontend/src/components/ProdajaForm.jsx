function ProdajaForm({
    novaProdaja,
    setNovaProdaja,
    serija_zganja,
    stranke,
    onSubmit,
    onCancel,
    urejanjeId,
}) {
    return(
         <div className="modal-overlay">
      <div className="form-modal">
        <h2 className="form-title">
          {urejanjeId ? "Uredi prodajo" : "Dodaj prodajo"}
        </h2>

        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">Serija</label>
            <select
                  className="form-control"
                  value={novaProdaja.serija_zganja_id}
                  onChange={(e) =>
                    setNovaProdaja({
                      ...novaProdaja,
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
            <label className="form-label">Ime stranke</label>
            <select
                  className="form-control"
                  value={novaProdaja.stranka_id}
                  onChange={(e) =>
                    setNovaProdaja({
                      ...novaProdaja,
                      stranka_id: e.target.value,
                    })
                  }>
                  <option value="">Izberi stranko</option>

                  {stranke.map((stranka) => (
                    <option key={stranka.id} value={stranka.id}>
                      {stranka.ime_ali_naziv}
                    </option>
                  ))}
              </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Datum prodaje</label>
            <input
              className="form-control"
              type="date"
              value={novaProdaja.datum_prodaje}
              onChange={(e) =>
                setNovaProdaja({
                  ...novaProdaja,
                  datum_prodaje: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Količina</label>
            <input
              className="form-control"
              type="number"
              step="1"
              value={novaProdaja.kolicina_l}
              onChange={(e) =>
                setNovaProdaja({
                  ...novaProdaja,
                  kolicina_l: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Cena po litru</label>
            <input
              className="form-control"
              type="number"
              step="0.1"
              value={novaProdaja.cena_na_l}
              onChange={(e) =>
                setNovaProdaja({
                  ...novaProdaja,
                  cena_na_l: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Skupna cena</label>
            <input
              className="form-control"
              type="number"
              step="0.1"
              value={novaProdaja.skupna_cena}
              onChange={(e) =>
                setNovaProdaja({
                  ...novaProdaja,
                  skupna_cena: e.target.value,
                })
              }
            />
          </div>

           <div className="mb-3">
                    <label className="form-label">Način plačila</label>
                    <select className="form-control"
                            value={novaProdaja.nacin_placila}
                            onChange={(e) =>
                            setNovaProdaja({...novaProdaja,
                            nacin_placila: e.target.value,
                        })
                    }>
                    <option value="">Izberi</option>
                    <option value="gotovina">Gotovina</option>
                    <option value="kartica">Kartica</option>
                    <option value="nakazilo">Nakazilo</option>
                    </select>
            </div>

            <div className="mb-3">
            <label className="form-label">Opomba</label>
            <input
              className="form-control"
              type="text"
              value={novaProdaja.opomba}
              onChange={(e) =>
                setNovaProdaja({
                  ...novaProdaja,
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

export default ProdajaForm;
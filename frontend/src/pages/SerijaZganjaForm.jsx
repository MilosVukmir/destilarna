function SerijaZganjaForm({
  novaSerija,
  setNovaSerija,
  onSubmit,
  onCancel,
  urejanjeId,
}) {
  return (
    <div className="modal-overlay">
      <div className="form-modal">
        <h2 className="form-title">
          {urejanjeId ? "Uredi serijo žganja" : "Dodaj serijo žganja"}
        </h2>

        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">Serija</label>
            <input
              className="form-control"
              type="text"
              value={novaSerija.naziv_serije}
              onChange={(e) =>
                setNovaSerija({
                  ...novaSerija,
                  naziv_serije: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Vrsta</label>
            <input
              className="form-control"
              type="text"
              value={novaSerija.vrsta_zganja}
              onChange={(e) =>
                setNovaSerija({
                  ...novaSerija,
                  vrsta_zganja: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Leto</label>
            <input
              className="form-control"
              type="text"
              value={novaSerija.leto_pridelave}
              onChange={(e) =>
                setNovaSerija({
                  ...novaSerija,
                  leto_pridelave: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Jakost</label>
            <input
              className="form-control"
              type="text"
              value={novaSerija.jakost}
              onChange={(e) =>
                setNovaSerija({
                  ...novaSerija,
                  jakost: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Količina</label>
            <input
              className="form-control"
              type="text"
              value={novaSerija.skupna_kolicina_l}
              onChange={(e) =>
                setNovaSerija({
                  ...novaSerija,
                  skupna_kolicina_l: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Razred</label>
            <input
              className="form-control"
              type="text"
              value={novaSerija.kakovostni_razred}
              onChange={(e) =>
                setNovaSerija({
                  ...novaSerija,
                  kakovostni_razred: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Opomba</label>
            <input
              className="form-control"
              type="text"
              value={novaSerija.opomba}
              onChange={(e) =>
                setNovaSerija({
                  ...novaSerija,
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

export default SerijaZganjaForm;
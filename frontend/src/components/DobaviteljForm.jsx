function DobaviteljForm({
  noviDobavitelj,
  setNoviDobavitelj,
  onSubmit,
  onCancel,
  urejanjeId,
}) {
  return (
    <form onSubmit={onSubmit}>
      <h2>{urejanjeId ? "Uredi dobavitelja" : "Dodaj dobavitelja"}</h2>

      <input
        type="text"
        placeholder="Ime ali naziv"
        value={noviDobavitelj.ime_ali_naziv}
        onChange={(e) =>
          setNoviDobavitelj({
            ...noviDobavitelj,
            ime_ali_naziv: e.target.value,
          })
        }
      />

      <input
        type="text"
        placeholder="Kontaktna oseba"
        value={noviDobavitelj.kontakt_oseba}
        onChange={(e) =>
          setNoviDobavitelj({
            ...noviDobavitelj,
            kontakt_oseba: e.target.value,
          })
        }
      />

      <input
        type="text"
        placeholder="Telefon"
        value={noviDobavitelj.telefon}
        onChange={(e) =>
          setNoviDobavitelj({
            ...noviDobavitelj,
            telefon: e.target.value,
          })
        }
      />

      <input
        type="text"
        placeholder="E-naslov"
        value={noviDobavitelj.e_naslov}
        onChange={(e) =>
          setNoviDobavitelj({
            ...noviDobavitelj,
            e_naslov: e.target.value,
          })
        }
      />

      <input
        type="text"
        placeholder="Naslov"
        value={noviDobavitelj.naslov}
        onChange={(e) =>
          setNoviDobavitelj({
            ...noviDobavitelj,
            naslov: e.target.value,
          })
        }
      />

      <button type="submit">
        {urejanjeId ? "Shrani spremembe" : "Dodaj"}
      </button>
      <button type="button" onClick={onCancel}>
        Prekliči
      </button>
    </form>
  );
}

export default DobaviteljForm;
import { useEffect, useState } from "react";
import SerijaZganjaForm from "./SerijaZganjaForm.jsx";
import { API_URL } from "../config/api.js";
import App from "../App.jsx";

function SerijaZganja(){

    const [ serijaZganja, setSerijaZganja ] = useState([]);

    const [ iskanje, setIskanje ] = useState("");

    const [prikaziFormo, setPrikaziFormo] = useState(false);

    const [novaSerija, setNovaSerija] = useState({naziv_serije: "",
                                                  vrsta_zganja: "",
                                                  leto_pridelave: "",
                                                  jakost: "",
                                                  skupna_kolicina_l: "",
                                                  kakovostni_razred: "",
                                                  opomba: "",    
                                                });

    const [urejanjeId, setUrejanjeId] = useState(null); 

    const [ filterVrsta, setFilterVrsta ] = useState("");

    useEffect(() => {
        const fetchSerijaZganja = async () => {
            const response = await fetch (
                `${API_URL}/serijazganja?iskanje=${iskanje}`
            );

            const data = await response.json();
            setSerijaZganja(data);
        };

        fetchSerijaZganja();
    },[iskanje]);

    //Dodajanje nove serije zganja
    const shraniSerijoZganja = async (e) => {
        e.preventDefault();

    const url = urejanjeId ? `${API_URL}/serijazganja/${urejanjeId}` :
                            `${API_URL}/serijazganja`;

    const metoda = urejanjeId ? "PUT" : "POST";

    const response = await fetch(url, {
        method: metoda,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(novaSerija),
    });

    const data = await response.json();

    if (response.ok) {
        alert(data.sporocilo);

        setNovaSerija({
            naziv_serije: "",
            vrsta_zganja: "",
            leto_pridelave: "",
            jakost: "",
            skupna_kolicina_l: "",
            kakovostni_razred: "",
            opomba: "",
        });

        setUrejanjeId(null);
        setPrikaziFormo(false);

        const responseSerije = await fetch(
            `${API_URL}/serijazganja?iskanje=${iskanje}`
        );

        const serijeData = await responseSerije.json();
        setSerijaZganja(serijeData);
    } else{
        alert(data.sporocilo);
    }
};

//Brisanje dobavitelja
  const IzbrisiSerijoZganja = async (id) => {
    const potrdi = window.confirm("Ali res želite izbrisati tisto serijo žganja?");

    if (!potrdi) {
        return;
    }

    const response = await fetch(`${API_URL}/serijazganja/${id}`,
        {
            method: "DELETE",
        }
    );

    const data = await response.json();

    if (response.ok) {
        setNovaSerija(serijaZganja.filter((serija) => serija.id !== id));
    } else{
        alert(data.sporocilo);
    }
  };

//Urejanje serije zganja
  const zacniUrejanje = (serija) => {
    setUrejanjeId(serija.id);

    setNovaSerija({
        naziv_serije: serija.naziv_serije,
        vrsta_zganja: serija.vrsta_zganja,
        leto_pridelave: serija.leto_pridelave,
        jakost: serija.jakost,
        skupna_kolicina_l: serija.skupna_kolicina_l,
        kakovostni_razred: serija.kakovostni_razred || "",
        opomba: serija.opomba || "",
    });

    setPrikaziFormo(true);
  };

    return (
        <>
        <div className="content-header">
            <h2>Serija žganja</h2>
            <button className="btn-add" onClick={() => setPrikaziFormo(true)}>
                Dodaj
            </button>
        </div>

        <div className="d-flex gap-3 mb-3">
        <input className="form-control search-input" type="text" placeholder="Išči serijo žganja..."
               value={iskanje}
               onChange={(e) => setIskanje(e.target.value)}/>
        
        <select className="form-select filter-select" value={filterVrsta} 
        onChange={(e) => setFilterVrsta(e.target.value)}
        style={{maxWidth: "180px"}}>

            <option value="">Vrsta...</option>
            {serijaZganja.map((serija) => (
              <option key={serija.id} value={serija.vrsta_zganja}>
                {serija.vrsta_zganja}
              </option>
            ))}
        </select>
        </div>
         {prikaziFormo && (
                <SerijaZganjaForm
                  novaSerija={novaSerija}
                  setNovaSerija={setNovaSerija}
                  onSubmit={shraniSerijoZganja}
                  onCancel={() => {
              setPrikaziFormo(false);
              setUrejanjeId(null);
              setNovaSerija({
                 naziv_serije: "",
                vrsta_zganja: "",
                leto_pridelave: "",
                jakost: "",
                skupna_kolicina_l: "",
                kakovostni_razred: "",
                opomba: "",
              });
            }}
            urejanjeId={urejanjeId}
          />
              )}
        
        <table className="table table-hover align-middle">
  <thead>
    <tr>
      <th>Serija</th>
      <th>Vrsta</th>
      <th>Leto</th>
      <th>Jakost</th>
      <th>Količina</th>
      <th>Razred</th>
      <th>Opomba</th>
      <th>Dejanje</th>
    </tr>
  </thead>

  <tbody>
    {serijaZganja.filter((serija) => filterVrsta === "" || 
    serija.vrsta_zganja === filterVrsta).map((serija) => (
      <tr key={serija.id}>
        <td>{serija.naziv_serije}</td>
        <td>{serija.vrsta_zganja}</td>
        <td>{serija.leto_pridelave}</td>
        <td>{serija.jakost}</td>
        <td>{serija.skupna_kolicina_l}</td>
        <td>{serija.kakovostni_razred}</td>
        <td>{serija.opomba}</td>
        <td>
          <button className="btn btn-sm btn-warning me-2" onClick={() => zacniUrejanje(serija)}>
            Izmeni
          </button>
          <button className="btn btn-sm btn-danger" onClick={() => IzbrisiSerijoZganja(serija.id)}>
            Izbriši
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table> 
     </>
    );
}

export default SerijaZganja;
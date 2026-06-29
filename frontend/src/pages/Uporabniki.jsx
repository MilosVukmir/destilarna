import { useEffect, useState } from "react";
import UporabnikiForm from "./UporabnikiForm.jsx";
import { API_URL } from "../config/api.js";

function Uporabniki(){

    const [ uporabniki, setUporabniki ] = useState([]);

    const [ iskanje, setIskanje ] = useState("");

    const [ prikaziFormo, setPrikaziFormo ] = useState(false);

    const [ noviUporabnik, setNoviUporabnik ] = useState({ uporabnisko_ime: "",
                                                           ime: "",
                                                           telefon: "",
                                                           e_naslov: "",
                                                           geslo: "",
                                                           vloga: "",
                                                        });
    
    const [ urejanjeId, setUrejanjeId ] = useState(null);

    const [ filterVloga, setFilterVloga ] = useState("");

    useEffect(() => {
        const fetchUporabniki = async () => {
            const response = await fetch(
                `${API_URL}/uporabniki?iskanje=${iskanje}`
            );

            const data = await response.json();
            setUporabniki(data);
        };
        fetchUporabniki();
    },[iskanje]);

    //Dodajanje novega uporabnika
    const shraniUporabnika = async (e) => {
        e.preventDefault();

    const url = urejanjeId ? `${API_URL}/uporabniki/${urejanjeId}`
                           : `${API_URL}/uporabniki`;
    
    const metoda = urejanjeId ? "PUT" : "POST";

    const response = await fetch(url, {
        method: metoda,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(noviUporabnik),
    });

    const data = await response.json();

    if(response.ok){
        alert(data.sporocilo);

        setNoviUporabnik({
            uporabnisko_ime: "",
            ime: "",
            telefon: "",
            e_naslov: "",
            geslo: "",
            vloga: "",
        });

        setUrejanjeId(null);
        setPrikaziFormo(false);

        const responseUporabniki = await fetch(
            `${API_URL}/uporabniki?iskanje=${iskanje}`
        );

        const uporabnikiData = await responseUporabniki.json();
        setUporabniki(uporabnikiData);
    } else{
        alert(data.sporocilo);
    }
    };

    //Brisanje uporabnika
    const izbrisiUporabnika = async (id) => {
        const potrdi = window.confirm("Ali res želite izbrisati uporabnika?");

        if(!potrdi){
            return;
        }

        const response = await fetch(`${API_URL}/uporabniki/${id}`,
            {
                method: "DELETE",
            }
        );

        const data = await response.json();

        if (response.ok) {
            setUporabniki(uporabniki.filter((uporabnik) => uporabnik.id !== id));
        } else {
            alert(data.sporocilo);
        }
    };

    //Urejanje uporabnika
    const zacniUrejanje = (uporabnik) => {
        setUrejanjeId(uporabnik.id);

        setNoviUporabnik({
            uporabnisko_ime: uporabnik.uporabnisko_ime,
            ime: uporabnik.ime,
            telefon: uporabnik.telefon || "",
            e_naslov: uporabnik.e_naslov,
            geslo: uporabnik.geslo,
            vloga: uporabnik.vloga,
        });
        setPrikaziFormo(true);
    };

    return(
        <>
        <div className="content-header">
      <h2>Upravljanje uporabnikov</h2>
    <button className="btn-add" onClick={() => setPrikaziFormo(true)}>
        Dodaj
    </button>
    </div>

    <div className="d-flex gap-3 mb-3">
    <input className="form-control search-input" type="text" placeholder="Išči uporabnika..."
            value={iskanje}
            onChange={(e) => setIskanje(e.target.value)}/>

    <select className="form-select filter-select" value={filterVloga} 
        onChange={(e) => setFilterVloga(e.target.value)}
        style={{maxWidth: "180px"}}>

            <option value="">Vloga...</option>
            <option value="administrator">Administrator</option>
            <option value="zaposleni">Zaposleni</option>
        </select>
    </div>

     {prikaziFormo && (
        <UporabnikiForm
          noviUporabnik={noviUporabnik}
          setNoviUporabnik={setNoviUporabnik}
          onSubmit={shraniUporabnika}
          onCancel={() => {
      setPrikaziFormo(false);
      setUrejanjeId(null);
      setNoviUporabnik({
        uporabnisko_ime: "",
        ime: "",
        telefon: "",
        e_naslov: "",
        geslo: "",
        vloga: "",
      });
    }}
    urejanjeId={urejanjeId}
  />
      )}

    <table className="table table-hover align-middle">
  <thead>
    <tr>
      <th>Uporabniško ime</th>
      <th>Ime</th>
      <th>Telefon</th>
      <th>E-naslov</th>
      <th>Vloga</th>
      <th>Dejanje</th>
    </tr>
  </thead>

  <tbody>
    {uporabniki.filter((uporabnik) => filterVloga === "" || uporabnik.vloga === filterVloga).map((uporabnik) => (
      <tr key={uporabnik.id}>
        <td>{uporabnik.uporabnisko_ime}</td>
        <td>{uporabnik.ime}</td>
        <td>{uporabnik.telefon}</td>
        <td>{uporabnik.e_naslov}</td>
        <td>{uporabnik.vloga}</td>
        <td>
          <button className="btn btn-sm btn-warning me-2" onClick={() => zacniUrejanje(uporabnik)}>
            Izmeni
          </button>
          <button className="btn btn-sm btn-danger" onClick={() => izbrisiUporabnika(uporabnik.id)}>
            Izbriši
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table> 
        </>
    )
}

export default Uporabniki;

import { useEffect, useState } from "react";
import ProdajaForm from "./ProdajaForm.jsx";
import { API_URL } from "../config/api.js";

function Prodaja(){

    const [ prodaja, setProdaja ] = useState([]);
    
    const [ iskanje, setIskanje ] = useState("");

    const [ serijaZganja, setSerijaZganja ] = useState([]);

    const [ stranke, setStranke ] = useState([]);

    const [ urejanjeId, setUrejanjeId ] = useState(null);

     const [prikaziFormo, setPrikaziFormo] = useState(false);

    const [ novaProdaja, setNovaProdaja ] = useState({ serija_zganja_id: "",
                                                       stranka_id: "",
                                                       datum_prodaje: "",
                                                       kolicina_l: "",
                                                       cena_na_l: "",
                                                       skupna_cena: "",
                                                       nacin_placila: "",
                                                       opomba: "", });

    useEffect(() => {
        const fetchProdaja = async() => {
            const response = await fetch(
                `${API_URL}/prodaja?iskanje=${iskanje}`
            );

        const data = await response.json();
        setProdaja(data);
    };
    fetchProdaja();
},[iskanje]);

    useEffect(() => {
        const fetchSerijeZganja = async () => {
            const response = await fetch(
                `${API_URL}/serijazganja`
            );
            
            const data = await response.json();
            setSerijaZganja(data);
        };
        fetchSerijeZganja();
        }, []);

    useEffect(() => {
        const fetchImeStranke = async () => {
            const response = await fetch(
                `${API_URL}/stranke`
            );
        
        const data = await response.json();
        setStranke(data);
        };
        fetchImeStranke();
    },[]);

    //Dodajanje nove prodaje
const shraniProdajo = async(e) => {
    e.preventDefault();

    const url = urejanjeId ? `${API_URL}/prodaja/${urejanjeId}` :
                             `${API_URL}/prodaja`;

    const metoda = urejanjeId ? "PUT" : "POST";

    const response = await fetch(url, {
        method: metoda,
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(novaProdaja),
    });

    const data = await response.json();

    if (response.ok) {
        alert(data.sporocilo);

        setNovaProdaja({ serija_zganja_id: "",
                         stranka_id: "",
                         datum_prodaje: "",
                         kolicina_l: "",
                         cena_na_l: "",
                         skupna_cena: "",
                         nacin_placila: "",
                         opomba: "",
        });

        setUrejanjeId(null);
        setPrikaziFormo(false);

        const responseProdaja = await fetch(
            `${API_URL}/prodaja?iskanje=${iskanje}`
        );

        const prodajaData = await responseProdaja.json();
        setProdaja(prodajaData);
    } else {
        alert(data.sporocilo);
    }
};

//Brisanje prodaje
    const izbrisiProdajo = async (id) => {
        const potrdi = window.confirm("Ali res želite izbrisati prodajo?");

        if (!potrdi) {
            return;
        }

        const response = await fetch( `${API_URL}/prodaja/${id}`,
            {
                method: "DELETE",
            }
        );

        const data = await response.json();

        if (response.ok) {
            setProdaja(prodaja.filter((prod) => prod.id !== id));
        } else {
            alert(data.sporocilo);
        }
    };

//Urejanje prodaj
    const zacniUrejanje = (prod) => {
        setUrejanjeId(prod.id);

        setNovaProdaja({
            serija_zganja_id: prod.serija_zganja_id,
            stranka_id: prod.stranka_id,
            datum_prodaje: prod.datum_prodaje.split("T")[0],
            kolicina_l: prod.kolicina_l,
            cena_na_l: prod.cena_na_l,
            skupna_cena: prod.skupna_cena,
            nacin_placila: prod.nacin_placila,
            opomba: prod.opomba || "",
        });
    
     setPrikaziFormo(true);
    };

return(
        <>
         <div className="content-header">
      <h2>Prodaja</h2>
    <button className="btn-add" onClick={() => setPrikaziFormo(true)}>
        Dodaj
    </button>
    </div>

    <input className="form-control search-input" type="text" placeholder="Išči prodajo..."
            value={iskanje}
            onChange={(e) => setIskanje(e.target.value)}/>

     {prikaziFormo && (
        <ProdajaForm
          novaProdaja={novaProdaja}
          setNovaProdaja={setNovaProdaja}
          serija_zganja={serijaZganja}
          stranke={stranke}
          onSubmit={shraniProdajo}
          onCancel={() => {
      setPrikaziFormo(false);
      setUrejanjeId(null);
      setNovaProdaja({
        serija_zganja_id: "",
        stranka_id: "",
        datum_prodaje: "",
        kolicina_l: "",
        cena_na_l: "",
        skupna_cena: "",
        nacin_placila: "",
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
      <th>Ime stranke</th>
      <th>Datum</th>
      <th>Količina</th>
      <th>Cena</th>
      <th>Skupna cena</th>
      <th>Nacin plačila</th>
      <th>Opomba</th>
      <th>Dejanje</th>
    </tr>
  </thead>

  <tbody>
    {prodaja.map((prod) => (
      <tr key={prod.id}>
        <td>{prod.serija}</td>
        <td>{prod.stranka}</td>
        <td>{prod.datum_prodaje.split("T")[0]}</td>
        <td>{prod.kolicina_l}</td>
        <td>{prod.cena_na_l}</td>
        <td>{prod.skupna_cena}</td>
        <td>{prod.nacin_placila}</td>
        <td>{prod.opomba}</td>
        <td>
          <button className="btn btn-sm btn-warning me-2" onClick={() => zacniUrejanje(prod)}>
            Izmeni
          </button>
          <button className="btn btn-sm btn-danger" onClick={() => izbrisiProdajo(prod.id)}>
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

export default Prodaja;
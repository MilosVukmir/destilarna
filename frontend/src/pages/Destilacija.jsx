import { useEffect, useState } from "react";
import { API_URL } from "../config/api.js";
import DestilacijaForm from "./DestilacijaForm.jsx";

function Destilacija(){
     const [ destilacija, setDestilacija ] = useState([]);

    const [ iskanje, setIskanje ] = useState("");

    const [fermentacije, setFermentacije] = useState([]);
    
    const [serijeZganja, setSerijeZganja] = useState([]);

    const [prikaziFormo, setPrikaziFormo] = useState(false);

    const [novaDestilacija, setNovaDestilacija] = useState({   fermentacija_id: "",
                                                               serija_zganja_id: "",
                                                               datum_destilacije: "",
                                                               tip_destilacije: "",
                                                               jakost_alkohola: "",
                                                               pridobljena_kolicina_l: "",
                                                               opomba: "",
                                                            });
    
    const [urejanjeId, setUrejanjeId] = useState(null); 

    const [filterJakost, setFilterJakost] = useState("");

    useEffect(() => {
    const fetchDestilacija = async() => {
        const response = await fetch(
            `${API_URL}/destilacija?iskanje=${iskanje}`
        );

        const data = await response.json();
        setDestilacija(data);
    };
    fetchDestilacija();
},[iskanje]);

    useEffect(() => {
        const fetchDropdownPodatki = async () => {
        const responseFermentacije = await fetch(`${API_URL}/fermentacija`);
        const fermentacijeData = await responseFermentacije.json();
    setFermentacije(fermentacijeData);

        const responseSerije = await fetch(`${API_URL}/serijazganja`);
        const serijeData = await responseSerije.json();
    setSerijeZganja(serijeData);
  };

  fetchDropdownPodatki();
}, []);

//Dodajanje nove fermentacije
const shraniDestilacijo = async(e) => {
    e.preventDefault();

    const url = urejanjeId ? `${API_URL}/destilacija/${urejanjeId}` : 
                             `${API_URL}/destilacija`;
    
    const metoda = urejanjeId ? "PUT" : "POST";

        const response = await fetch(url, {
            method: metoda,
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(novaDestilacija),
        });

        const data = await response.json();

    if (response.ok) {
            alert(data.sporocilo);

            setNovaDestilacija({
                fermentacija_id: "",
                serija_zganja_id: "",
                datum_destilacije: "",
                tip_destilacije: "",
                jakost_alkohola: "",
                pridobljena_kolicina_l: "",
                opomba: "",
            });

            setUrejanjeId(null);
            setPrikaziFormo(false);

            const responseDestilacija = await fetch(
                `${API_URL}/destilacija?iskanje=${iskanje}`
            );

            const destilacijaData = await responseDestilacija.json();
            setDestilacija(destilacijaData);
        } else{
            alert(data.sporocilo);
        }
    }; 

//Brisanje destilacije
    const izbrisiDestilacijo = async (id) => {
        const potrdi = window.confirm("Ali res želite izbrisati destilacijo?");

        if (!potrdi) {
            return;
        }

        const response = await fetch( `${API_URL}/destilacija/${id}`,
            {
                method: "DELETE",
            }
        );

        const data = await response.json();

        if (response.ok) {
            setDestilacija(destilacija.filter((dest) => dest.id !== id));
        } else {
            alert(data.sporocilo);
        }
    };

   // Urejanje destilacije
    const zacniUrejanje = (dest) => {
        setUrejanjeId(dest.id);

        setNovaDestilacija({
        fermentacija_id: dest.fermentacija_id,
        serija_zganja_id: dest.serija_zganja_id,
        datum_destilacije: dest.datum_destilacije.split("T")[0],
        tip_destilacije: dest.tip_destilacije,
        jakost_alkohola: dest.jakost_alkohola,
        pridobljena_kolicina_l: dest.pridobljena_kolicina_l,
        opomba: dest.opomba || "",
    });

    setPrikaziFormo(true);
};

return(
        <>
         <div className="content-header">
            <h2>Destilacija</h2>
            <button className="btn-add" onClick={() => setPrikaziFormo(true)}>
                Dodaj
            </button>
        </div>

        <div className="d-flex gap-3 mb-3">
         <input className="form-control search-input" type="text" placeholder="Išči destilacijo..."
               value={iskanje} 
               onChange={(e) => setIskanje(e.target.value)}/>
         
         <select className="form-select filter-select" value={filterJakost} 
        onChange={(e) => setFilterJakost(e.target.value)}
        style={{maxWidth: "180px"}}>

            <option value="">Jakost...</option>
            {destilacija.map((dest) => (
              <option key={dest.id} value={dest.jakost_alkohola}>
                {dest.jakost_alkohola}
              </option>
            ))}
        </select>
         </div>

         {prikaziFormo && (
            <DestilacijaForm
                novaDestilacija={novaDestilacija}
                setNovaDestilacija={setNovaDestilacija}
                fermentacije={fermentacije}
                serijeZganja={serijeZganja}
                onSubmit={shraniDestilacijo}
                onCancel={() => {
                    setPrikaziFormo(false);
                    setUrejanjeId(null);
                    setNovaDestilacija({
                        serija_zganja_id: "",
                        datum_destilacije: "",
                        tip_destilacije: "",
                        jakost_alkohola: "",
                        pridobljena_kolicina_l: "",
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
                    <th>Datum</th>
                    <th>Tip</th>
                    <th>Jakost</th>
                    <th>Količina</th>
                    <th>Opomba</th>
                    <th>Dejanje</th>
                </tr>
            </thead>

            <tbody>
                {destilacija.filter((dest) => filterJakost === "" ||
                String(dest.jakost_alkohola) === filterJakost).map((dest) => (
                    <tr key={dest.id}>
                        <td>{dest.serija}</td>
                        <td>{dest.datum_destilacije.split("T")[0]}</td>
                        <td>{dest.tip_destilacije}</td>
                        <td>{dest.jakost_alkohola}</td>
                        <td>{dest.pridobljena_kolicina_l}</td>
                        <td>{dest.opomba}</td>
                        <td>
                            <button className="btn btn-sm btn-warning me-2" onClick={() => zacniUrejanje(dest)}>
                                Izmeni
                            </button>
                            <button className="btn btn-sm btn-danger" onClick={() => izbrisiDestilacijo(dest.id)}>
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

export default Destilacija;
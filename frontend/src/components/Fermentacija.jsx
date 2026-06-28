import { useEffect, useState } from "react";
//import FermentacijaForm from "./FermentacijaForm.jsx";
import { API_URL } from "../config/api.js";
import FermentacijaForm from "./FermentacijaForm.jsx";

function Fermentacija(){

    const [ fermentacija, setFermentacija ] = useState([]);

    const [ iskanje, setIskanje ] = useState("");

    const [prevzemiSadja, setPrevzemiSadja] = useState([]);

    const [prikaziFormo, setPrikaziFormo] = useState(false);

    const [novaFermentacija, setNovaFermentacija] = useState({ prevzem_sadja_id: "",
                                                               datum_zacetka: "",
                                                               datum_zakljucka: "",
                                                               posoda: "",
                                                               zacetna_kolicina_kg: "",
                                                               status: "",
                                                               opomba: "",
                                                            });
    
    const [urejanjeId, setUrejanjeId] = useState(null); 


useEffect(() => {
    const fetchFermentacija = async() => {
        const response = await fetch(
            `${API_URL}/fermentacija?iskanje=${iskanje}`
        );

        const data = await response.json();
        setFermentacija(data);
    };
    fetchFermentacija();
},[iskanje]);


useEffect(() => {
  const fetchPrevzemiSadja = async () => {
    const response = await fetch(`${API_URL}/prevzemsadja`);
    const data = await response.json();

    setPrevzemiSadja(data);
  };

  fetchPrevzemiSadja();
}, []);

//Dodajanje nove fermentacije
const shraniFermentacijo = async(e) => {
    e.preventDefault();

    const url = urejanjeId ? `${API_URL}/fermentacija/${urejanjeId}` : 
                             `${API_URL}/fermentacija`;
    
    const metoda = urejanjeId ? "PUT" : "POST";

        const response = await fetch(url, {
            method: metoda,
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(novaFermentacija),
        });

        const data = await response.json();

    if (response.ok) {
            alert(data.sporocilo);

            setNovaFermentacija({
                prevzem_sadja_id: "",
                datum_zacetka: "",
                datum_zakljucka: "",
                posoda: "",
                zacetna_kolicina_kg: "",
                status: "",
                opomba: "",
            });

            setUrejanjeId(null);
            setPrikaziFormo(false);

            const responseFermentacija = await fetch(
                `${API_URL}/fermentacija?iskanje=${iskanje}`
            );

            const fermentacijaData = await responseFermentacija.json();
            setFermentacija(fermentacijaData);
        } else{
            alert(data.sporocilo);
        }
    }; 

  //Brisanje fermentacije
    const izbrisiFermentacijo = async (id) => {
        const potrdi = window.confirm("Ali res želite izbrisati fermentacijo?");

        if (!potrdi) {
            return;
        }

        const response = await fetch( `${API_URL}/fermentacija/${id}`,
            {
                method: "DELETE",
            }
        );

        const data = await response.json();

        if (response.ok) {
            setFermentacija(fermentacija.filter((ferm) => ferm.id !== id));
        } else {
            alert(data.sporocilo);
        }
    };

        // Urejanje fermentacije
    const zacniUrejanje = (ferm) => {
        setUrejanjeId(ferm.id);

        setNovaFermentacija({
        prevzem_sadja_id: ferm.prevzem_sadja_id,
        datum_zacetka: ferm.datum_zacetka.split("T")[0],
        datum_zakljucka: ferm.datum_zakljucka.split("T")[0],
        posoda: ferm.posoda,
        zacetna_kolicina_kg: ferm.zacetna_kolicina_kg,
        status: ferm.status,
        opomba: ferm.opomba || "",
    });

    setPrikaziFormo(true);
};

 return(
        <>
         <div className="content-header">
            <h2>Fermentacija</h2>
            <button className="btn-add" onClick={() => setPrikaziFormo(true)}>
                Dodaj
            </button>
        </div>

         <input className="form-control search-input" type="text" placeholder="Išči fermentacijo..."
               value={iskanje} 
               onChange={(e) => setIskanje(e.target.value)}/>
         
         {prikaziFormo && (
            <FermentacijaForm
                novaFermentacija={novaFermentacija}
                setNovaFermentacija={setNovaFermentacija}
                prevzemiSadja={prevzemiSadja}
                onSubmit={shraniFermentacijo}
                onCancel={() => {
                    setPrikaziFormo(false);
                    setUrejanjeId(null);
                    setNovaFermentacija({
                        prevzem_sadja_id: "",
                        datum_zacetka: "",
                        datum_zakljucka: "",
                        posoda: "",
                        zacetna_kolicina_kg: "",
                        status: "",
                        opomba: "",
                    });
                }}
                urejanjeId={urejanjeId}
                />
         )}

         <table className="table table-hover align-middle">
            <thead>
                <tr>
                    <th>Sadje</th>
                    <th>Začetek</th>
                    <th>Zaključek</th>
                    <th>Posoda</th>
                    <th>Količina</th>
                    <th>Status</th>
                    <th>Opomba</th>
                    <th>Dejanje</th>
                </tr>
            </thead>

            <tbody>
                {fermentacija.map((ferm) => (
                    <tr key={ferm.id}>
                        <td>{ferm.sadje}</td>
                        <td>{ferm.datum_zacetka.split("T")[0]}</td>
                        <td>{ferm.datum_zakljucka.split("T")[0]}</td>
                        <td>{ferm.posoda}</td>
                        <td>{ferm.zacetna_kolicina_kg}</td>
                        <td>{ferm.status}</td>
                        <td>{ferm.opomba}</td>
                        <td>
                            <button className="btn btn-sm btn-warning me-2" onClick={() => zacniUrejanje(ferm)}>
                                Izmeni
                            </button>
                            <button className="btn btn-sm btn-danger" onClick={() => izbrisiFermentacijo(ferm.id)}>
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


export default Fermentacija;
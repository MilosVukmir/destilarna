import { useEffect, useState } from "react";
import PrevzemSadjaForm from "./PrevzemSadjaForm.jsx";
import { API_URL } from "../config/api.js";

function PrevzemSadja(){

    const [prevzemi, setPrevzem] = useState([]);

    const [iskanje, setIskanje] = useState("");

    const [prikaziFormo, setPrikaziFormo] = useState(false);

    const [noviPrevzem, setNoviPrevzem] = useState({ dobavitelj_id: "",
                                                     sadje_id: "",
                                                     datum_prevzema: "",
                                                     kolicina_kg: "",
                                                     cena_na_kg: "",
                                                     skupna_cena: "",
                                                     opomba: "",
                                                    });
    
    const [urejanjeId, setUrejanjeId] = useState(null); 

    const [dobavitelji, setDobavitelji] = useState([]);
    
    const [sadje, setSadje] = useState([]);

    useEffect(() => {
        const fetchPrevzem = async() => {
            const response = await fetch(
                `${API_URL}/prevzemsadja?iskanje=${iskanje}`
            );

            const data = await response.json();
            setPrevzem(data);
        };
        fetchPrevzem();
    },[iskanje]);

    useEffect(() => {
        const fetchDropDownPodatki = async () => {
            const responseDobavitelji = await fetch(`${API_URL}/dobavitelji`);
            const dobaviteljiData = await responseDobavitelji.json();
            setDobavitelji(dobaviteljiData);

            const responseSadje = await fetch(`${API_URL}/sadje`);
            const sadjeData = await responseSadje.json();
            setSadje(sadjeData);
        };

        fetchDropDownPodatki();
    }, []);

//Dodajanje novega prevzema
const shraniPrevzem = async(e) => {
    e.preventDefault();

    const url = urejanjeId ? `${API_URL}/prevzemsadja/${urejanjeId}` : 
                             `${API_URL}/prevzemsadja`;
    
    const metoda = urejanjeId ? "PUT" : "POST";

        const response = await fetch(url, {
            method: metoda,
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(noviPrevzem),
        });

        const data = await response.json();

    if (response.ok) {
            alert(data.sporocilo);

            setNoviPrevzem({
                dobavitelj_id: "",
                sadje_id: "",
                datum_prevzema: "",
                kolicina_kg: "",
                cena_na_kg: "",
                skupna_cena: "",
                opomba: "",
            });

            setUrejanjeId(null);
            setPrikaziFormo(false);

            const responsePrevzem = await fetch(
                `${API_URL}/prevzemsadja?iskanje=${iskanje}`
            );

            const prevzemData = await responsePrevzem.json();
            setPrevzem(prevzemData);
        } else{
            alert(data.sporocilo);
        }
    }; 

    //Brisanje sadja
    const izbrisiPrevzem = async (id) => {
        const potrdi = window.confirm("Ali res želite izbrisati prevzem?");

        if (!potrdi) {
            return;
        }

        const response = await fetch( `${API_URL}/prevzemsadja/${id}`,
            {
                method: "DELETE",
            }
        );

        const data = await response.json();

        if (response.ok) {
            setPrevzem(prevzemi.filter((prevzem) => prevzem.id !== id));
        } else {
            alert(data.sporocilo);
        }
    };

        // Urejanje prevzema
    const zacniUrejanje = (prevzem) => {
        setUrejanjeId(prevzem.id);

        setNoviPrevzem({
        dobavitelj_id: prevzem.dobavitelj_id,
        sadje_id: prevzem.sadje_id,
        datum_prevzema: prevzem.datum_prevzema.split("T")[0],
        kolicina_kg: prevzem.kolicina_kg,
        cena_na_kg: prevzem.cena_na_kg,
        skupna_cena: prevzem.skupna_cena,
        opomba: prevzem.opomba || "",
    });

    setPrikaziFormo(true);
};

    return(
        <>
         <div className="content-header">
            <h2>Prevzem sadja</h2>
            <button className="btn-add" onClick={() => setPrikaziFormo(true)}>
                Dodaj
            </button>
        </div>

         <input className="form-control search-input" type="text" placeholder="Išči prevzem..."
               value={iskanje} 
               onChange={(e) => setIskanje(e.target.value)}/>
         
        {prikaziFormo && (
            <PrevzemSadjaForm 
                noviPrevzem = {noviPrevzem}
                setNoviPrevzem={setNoviPrevzem}
                dobavitelji={dobavitelji}
                sadje={sadje}
                onSubmit={shraniPrevzem}
                onCancel={() => {
                    setPrikaziFormo(false);
                    setUrejanjeId(null);
                    setNoviPrevzem({
                        dobavitelj_id: "",
                        sadje_id: "",
                        datum_prevzema: "",
                        kolicina_kg: "",
                        cena_na_kg: "",
                        skupna_cena: "",
                        opomba: "",
                    });
                }}
                urejanjeId={urejanjeId}
                />
        )}

         <table className="table table-hover align-middle">
            <thead>
                <tr>
                    <th>Dobavitelj</th>
                    <th>Sadje</th>
                    <th>Datum prevzema</th>
                    <th>Količina (kg)</th>
                    <th>Skupna cena</th>
                    <th>Opomba</th>
                    <th>Dejanje</th>
                </tr>
            </thead>

            <tbody>
                {prevzemi.map((prevzem) => (
                    <tr key={prevzem.id}>
                        <td>{prevzem.dobavitelj}</td>
                        <td>{prevzem.sadje}</td>
                        <td>{prevzem.datum_prevzema.split("T")[0]}</td>
                        <td>{prevzem.kolicina_kg}</td>
                        <td>{prevzem.skupna_cena}</td>
                        <td>{prevzem.opomba}</td>
                        <td>
                            <button className="btn btn-sm btn-warning me-2" onClick={() => zacniUrejanje(prevzem)}>
                                Izmeni
                            </button>
                            <button className="btn btn-sm btn-danger" onClick={() => izbrisiPrevzem(prevzem.id)}>
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

export default PrevzemSadja;
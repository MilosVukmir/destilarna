import { useEffect, useState } from "react";
import SadjeForm from "./SadjeForm.jsx";
import { API_URL } from "../config/api.js";

function Sadje(){

    const [sadje, setSadje] = useState([]);

    const [iskanje, setIskanje] = useState("");

    const [prikaziFormo, setPrikaziFormo] = useState(false);

    const [novoSadje, setNovoSadje] = useState({naziv: "",
                                                sorta: "",
                                                opis: "",
                                                });

    const [urejanjeId, setUrejanjeId] = useState(null);

    useEffect(() => {
        const fetchSadje = async() => {
            const response = await fetch(
                `${API_URL}/sadje?iskanje=${iskanje}`
            );

            const data = await response.json();
            setSadje(data);
        };
        fetchSadje();
    },[iskanje]);

    //Dodajanje novega sadja
    const shraniSadje = async(e) => {
        e.preventDefault();

        const url = urejanjeId ? `${API_URL}/sadje/${urejanjeId}` : 
                                `${API_URL}/sadje`;
        
        const metoda = urejanjeId ? "PUT" : "POST";

        const response = await fetch(url, {
            method: metoda,
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(novoSadje),
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.sporocilo);

            setNovoSadje({
                naziv: "",
                sorta: "",
                opis: "",
            });

            setUrejanjeId(null);
            setPrikaziFormo(false);

            const responseSadje = await fetch(
                `${API_URL}/sadje?iskanje=${iskanje}`
            );

            const sadjeData = await responseSadje.json();
            setSadje(sadjeData);
        } else{
            alert(data.sporocilo);
        }
    };

    //Brisanje sadja
    const izbrisiSadje = async (id) => {
        const potrdi = window.confirm("Ali res želite izbrisati sadje?");

        if (!potrdi) {
            return;
        }

        const response = await fetch( `${API_URL}/sadje/${id}`,
            {
                method: "DELETE",
            }
        );

        const data = await response.json();

        if (response.ok) {
            setSadje(sadje.filter((item) => item.id !== id));
        } else {
            alert(data.sporocilo);
        }
    };

    //Urejanje dobavitelja
    const zacniUrejanje = (item) => {
        setUrejanjeId(item.id);

        setNovoSadje({
            naziv: item.naziv, 
            sorta: item.sorta,
            opis: item.opis || "",
        });

        setPrikaziFormo(true);
    };

    return (
        <>
        <div className="content-header">
            <h2>Sadje</h2>
            <button className="btn-add" onClick={() => setPrikaziFormo(true)}>
                Dodaj
            </button>
        </div>

        <input className="form-control search-input" type="text" placeholder="Išči sadje..."
               value={iskanje} 
               onChange={(e) => setIskanje(e.target.value)}/>
        
        {prikaziFormo && (
            <SadjeForm 
                novoSadje = {novoSadje}
                setNovoSadje={setNovoSadje}
                onSubmit={shraniSadje}
                onCancel={() => {
                    setPrikaziFormo(false);
                    setUrejanjeId(null);
                    setNovoSadje({
                        naziv: "",
                        sorta: "",
                        opis: "",
                    });
                }}
                urejanjeId={urejanjeId}
                />
        )}
        
        <table className="table table-hover align-middle">
            <thead>
                <tr>
                    <th>Naziv</th>
                    <th>Sorta</th>
                    <th>Opis</th>
                    <th>Dejanje</th>
                </tr>
            </thead>

            <tbody>
                {sadje.map((item) => (
                    <tr key={item.id}>
                        <td>{item.naziv}</td>
                        <td>{item.sorta}</td>
                        <td>{item.opis}</td>
                        <td>
                            <button className="btn btn-sm btn-warning me-2" onClick={() => zacniUrejanje(item)}>
                                Izmeni
                            </button>
                            <button className="btn btn-sm btn-danger" onClick={() => izbrisiSadje(item.id)}>
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

export default Sadje;
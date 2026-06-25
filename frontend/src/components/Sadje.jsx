import { useEffect, useState } from "react";
//import SadjeForm from "./SadjeForm.jsx";
import { API_URL } from "../config/api.js";

function Sadje(){

    const [sadje, setSadje] = useState([]);

    const [iskanje, setIskanje] = useState("");

    useEffect(() => {
        const fetchSadje = async () => {
            const response = await fetch(
                `${API_URL}/sadje?iskanje=${iskanje}`
            );

            const data = await response.json();
            setSadje(data);
        };
        fetchSadje();
    }, [iskanje]);

    return(
        <>
        <div className="content-header">
            <h2>Sadje</h2>
            <button className="btn-add">Dodaj</button>
        </div>

        <input className="form-control search-input" type="text" placeholder="Išči sadje..."
         value={iskanje} onChange={(e) => setIskanje(e.target.value)}/>
        
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
                {sadje.map((voce) => (
                    <tr key={voce.id}>
                        <td>{voce.naziv}</td>
                        <td>{voce.sorta}</td>
                        <td>{voce.opis}</td>
                        <td>
                            <button className="btn btn-sm btn-warning me-2">Izmeni</button>
                            <button className="btn btn-sm btn-danger">Izbriši</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    );
}

export default Sadje;
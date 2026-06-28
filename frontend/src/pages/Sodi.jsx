import { useEffect, useState } from "react";
import SodiForm from "./SodiForm.jsx";
import { API_URL } from "../config/api.js";

function Sodi(){

    const [ sodi, setSodi ] = useState([]);

    const [ iskanje, setIskanje ] = useState("");

    const [prikaziFormo, setPrikaziFormo] = useState(false);

    const [noviSod, setNoviSod] = useState({ serija_zganja_id: "",
                                             oznaka: "",
                                             material: "",
                                             prostornina_l: "",
                                             lokacija: "",
                                             stanje: "",
                                                    });
    
    const [urejanjeId, setUrejanjeId] = useState(null); 

    const [serijaZganja, setSerijaZganja] = useState([]);

    useEffect(() => {
        const fetchSodi = async () => {
            const response = await fetch (
                `${API_URL}/sodi?iskanje=${iskanje}`
            );

            const data = await response.json();
            setSodi(data);
        };
        fetchSodi();
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

    //Dodajanje novega soda
const shraniSod = async(e) => {
    e.preventDefault();

    const url = urejanjeId ? `${API_URL}/sodi/${urejanjeId}` : 
                             `${API_URL}/sodi`;
    
    const metoda = urejanjeId ? "PUT" : "POST";

        const response = await fetch(url, {
            method: metoda,
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(noviSod),
        });

        const data = await response.json();

    if (response.ok) {
            alert(data.sporocilo);

            setNoviSod({
                serija_zganja_id: "",
                oznaka: "",
                material: "",
                prostornina_l: "",
                lokacija: "",
                stanje: "",
            });

            setUrejanjeId(null);
            setPrikaziFormo(false);

            const responseSodi = await fetch(
                `${API_URL}/sodi?iskanje=${iskanje}`
            );

            const sodiData = await responseSodi.json();
            setSodi(sodiData);
        } else{
            alert(data.sporocilo);
        }
    }; 

    //Brisanje soda
    const izbrisiSod = async (id) => {
        const potrdi = window.confirm("Ali res želite izbrisati sod?");

        if (!potrdi) {
            return;
        }

        const response = await fetch( `${API_URL}/sodi/${id}`,
            {
                method: "DELETE",
            }
        );

        const data = await response.json();

        if (response.ok) {
            setSodi(sodi.filter((sod) => sod.id !== id));
        } else {
            alert(data.sporocilo);
        }
    };

     // Urejanje sodov
    const zacniUrejanje = (sod) => {
        setUrejanjeId(sod.id);

        setNoviSod({
        serija_zganja_id: sod.serija_zganja_id,
        oznaka: sod.oznaka,
        material: sod.material,
        prostornina_l: sod.prostornina_l,
        lokacija: sod.lokacija || "",
        stanje: sod.stanje,
    });

    setPrikaziFormo(true);
};

    return(
        <>
         <div className="content-header">
      <h2>Sodi</h2>
    <button className="btn-add" onClick={() => setPrikaziFormo(true)}>
        Dodaj
    </button>
    </div>

    <input className="form-control search-input" type="text" placeholder="Išči sod..."
            value={iskanje}
            onChange={(e) => setIskanje(e.target.value)}/>

     {prikaziFormo && (
        <SodiForm
          noviSod={noviSod}
          setNoviSod={setNoviSod}
          serija_zganja={serijaZganja}
          onSubmit={shraniSod}
          onCancel={() => {
      setPrikaziFormo(false);
      setUrejanjeId(null);
      setNoviSod({
        serija_zganja_id: "",
        oznaka: "",
        material: "",
        prostornina_l: "",
        lokacija: "",
        stanje: "",
      });
    }}
    urejanjeId={urejanjeId}
  />
      )}

    <table className="table table-hover align-middle">
  <thead>
    <tr>
      <th>Serija</th>
      <th>Oznaka</th>
      <th>Material</th>
      <th>Prostornina</th>
      <th>Lokacija</th>
      <th>Stanje</th>
      <th>Dejanje</th>
    </tr>
  </thead>

  <tbody>
    {sodi.map((sod) => (
      <tr key={sod.id}>
        <td>{sod.serija}</td>
        <td>{sod.oznaka}</td>
        <td>{sod.material}</td>
        <td>{sod.prostornina_l}</td>
        <td>{sod.lokacija}</td>
        <td>{sod.stanje}</td>
        <td>
          <button className="btn btn-sm btn-warning me-2" onClick={() => zacniUrejanje(sod)}>
            Izmeni
          </button>
          <button className="btn btn-sm btn-danger" onClick={() => izbrisiSod(sod.id)}>
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

export default Sodi;
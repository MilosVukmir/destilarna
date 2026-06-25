import { useEffect, useState } from "react";
import StrankaForm from "./StrankaForm.jsx";
import { API_URL } from "../config/api.js";

function Stranke(){

    const [ stranke, setStranke ] = useState([]);

    const [ iskanje, setIskanje ] = useState("");

    const [prikaziFormo, setPrikaziFormo ] = useState(false);

    const [novaStranka, setNovaStranka ] = useState({ime_ali_naziv: "",
                                                     telefon: "",
                                                     e_naslov: "",
                                                     naslov: "",
                                                     tip_stranke: "",
                                                    });
    const [ urejanjeId, setUrejanjeId ] = useState(null); 

    useEffect(() => {
        const fetchStranke = async () => {
            const response = await fetch(
                `${API_URL}/stranke?iskanje=${iskanje}`
            );
        
            const data = await response.json();
            setStranke(data);
        };
        fetchStranke();
    },[iskanje]);

//Dodajanje nove stranke
const shraniStranko = async (e) => {
  e.preventDefault();

const url = urejanjeId ? `${API_URL}/stranke/${urejanjeId}` 
                       : `${API_URL}/stranke`;

const metoda = urejanjeId ? "PUT" : "POST";

const response = await fetch(url, {
  method: metoda,
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(novaStranka),
});

const data = await response.json();

if (response.ok) {
  alert(data.sporocilo);

  setNovaStranka({
    ime_ali_naziv: "",
    telefon: "",
    e_naslov: "",
    naslov: "",
    tip_stranke: "",
  });

  setUrejanjeId(null);
  setPrikaziFormo(false);

  const responseStranke = await fetch(
     `${API_URL}/stranke?iskanje=${iskanje}`
  );

  const strankeData = await responseStranke.json();
  setStranke(strankeData);
}else{
  alert(data.sporocilo);
}
};

//Brisanje stranke
const izbrisiStranko = async(id) => {
  const potrdi = window.confirm("Ali res želite izbrisati stranko?");

  if (!potrdi) {
    return;
  }

  const response = await fetch(`${API_URL}/stranke/${id}`,
    {
      method: "DELETE",
    }
  );

  const data = await response.json();

  if (response.ok) {
    setStranke(stranke.filter((stranka) => stranka.id !== id));
  } else{
    alert(data.sporocilo);
  }
};

//Urejanje strank
const zacniUrejanje = (stranka) => {
  setUrejanjeId(stranka.id);

  setNovaStranka({
    ime_ali_naziv: stranka.ime_ali_naziv,
    telefon: stranka.telefon || "",
    e_naslov: stranka.e_naslov || "",
    naslov: stranka.naslov || "",
    tip_stranke: stranka.tip_stranke,
  });

  setPrikaziFormo(true);
};
return(
    <>
    <div className="content-header">
      <h2>Stranke</h2>
    <button className="btn-add" onClick={() => setPrikaziFormo(true)}>
        Dodaj
    </button>
    </div>

    <input className="form-control search-input" type="text" placeholder="Išči stranko..."
            value={iskanje}
            onChange={(e) => setIskanje(e.target.value)}/>

     {prikaziFormo && (
        <StrankaForm
          novaStranka={novaStranka}
          setNovaStranka={setNovaStranka}
          onSubmit={shraniStranko}
          onCancel={() => {
      setPrikaziFormo(false);
      setUrejanjeId(null);
      setNovaStranka({
        ime_ali_naziv: "",
        telefon: "",
        e_naslov: "",
        naslov: "",
        tip_stranke: "",
      });
    }}
    urejanjeId={urejanjeId}
  />
      )}

    <table className="table table-hover align-middle">
  <thead>
    <tr>
      <th>Ime/Naziv</th>
      <th>Telefon</th>
      <th>E-naslov</th>
      <th>Naslov</th>
      <th>Tip stranke</th>
      <th>Dejanje</th>
    </tr>
  </thead>

  <tbody>
    {stranke.map((stranka) => (
      <tr key={stranka.id}>
        <td>{stranka.ime_ali_naziv}</td>
        <td>{stranka.telefon}</td>
        <td>{stranka.e_naslov}</td>
        <td>{stranka.naslov}</td>
        <td>{stranka.tip_stranke}</td>
        <td>
          <button className="btn btn-sm btn-warning me-2" onClick={() => zacniUrejanje(stranka)}>
            Izmeni
          </button>
          <button className="btn btn-sm btn-danger" onClick={() => izbrisiStranko(stranka.id)}>
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

export default Stranke;
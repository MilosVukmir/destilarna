import { useEffect, useState } from "react";
import DobaviteljForm from "./DobaviteljForm.jsx";

function Dobavitelji(){

  const [dobavitelji, setDobavitelji] = useState([]);

  const [iskanje, setIskanje] = useState("");

  const [prikaziFormo, setPrikaziFormo] = useState(false);

  const [noviDobavitelj, setNoviDobavitelj] = useState({ime_ali_naziv: "",
                                                        kontakt_oseba: "",
                                                        telefon: "",
                                                        e_naslov: "",
                                                        naslov: "",    
                                                        });
  const [urejanjeId, setUrejanjeId] = useState(null); 
    

  useEffect(() => {
    const fetchDobavitelji = async () =>  {
      const response = await fetch(
        `http://localhost:3000/dobavitelji?iskanje=${iskanje}`
      );

      const data = await response.json();
      setDobavitelji(data);

    };
    fetchDobavitelji();
  }, [iskanje]);

  //Dodajanje novega dobavitelja
  const shraniDobavitelja = async (e) => {
  e.preventDefault();

  const url = urejanjeId
    ? `http://localhost:3000/dobavitelji/${urejanjeId}`
    : "http://localhost:3000/dobavitelji";

  const metoda = urejanjeId ? "PUT" : "POST";

  const response = await fetch(url, {
    method: metoda,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(noviDobavitelj),
  });

  const data = await response.json();

  if (response.ok) {
    alert(data.sporocilo);

    setNoviDobavitelj({
      ime_ali_naziv: "",
      kontakt_oseba: "",
      telefon: "",
      e_naslov: "",
      naslov: "",
    });

    setUrejanjeId(null);
    setPrikaziFormo(false);

    const responseDobavitelji = await fetch(
      `http://localhost:3000/dobavitelji?iskanje=${iskanje}`
    );

    const dobaviteljiData = await responseDobavitelji.json();
    setDobavitelji(dobaviteljiData);
  } else {
    alert(data.sporocilo);
  }
};



  //Brisanje dobavitelja
  const izbrisiDobavitelja = async (id) => {
    const potrdi = window.confirm("Ali res želite izbrisati dobavitelja?");

    if (!potrdi) {
        return;
    }

    const response = await fetch(`http://localhost:3000/dobavitelji/${id}`,
        {
            method: "DELETE",
        }
    );

    const data = await response.json();

    if (response.ok) {
        setDobavitelji(dobavitelji.filter((dobavitelj) => dobavitelj.id !== id));
    } else{
        alert(data.sporocilo);
    }
  };

//Urejanje dobavitelja
  const zacniUrejanje = (dobavitelj) => {
    setUrejanjeId(dobavitelj.id);

    setNoviDobavitelj({
        ime_ali_naziv: dobavitelj.ime_ali_naziv,
        kontakt_oseba: dobavitelj.kontakt_oseba,
        telefon: dobavitelj.telefon,
        e_naslov: dobavitelj.e_naslov || "",
        naslov: dobavitelj.naslov || "",
    });

    setPrikaziFormo(true);
  };

  return(
    <>
    <input type="text" placeholder="Išči dobavitelja..."
            value={iskanje}
            onChange={(e) => setIskanje(e.target.value)}/>

    <button onClick={() => setPrikaziFormo(true)}>
        Dodaj dobavitelja
    </button>

     {prikaziFormo && (
        <DobaviteljForm
          noviDobavitelj={noviDobavitelj}
          setNoviDobavitelj={setNoviDobavitelj}
          onSubmit={shraniDobavitelja}
          onCancel={() => {
      setPrikaziFormo(false);
      setUrejanjeId(null);
      setNoviDobavitelj({
        ime_ali_naziv: "",
        kontakt_oseba: "",
        telefon: "",
        e_naslov: "",
        naslov: "",
      });
    }}
    urejanjeId={urejanjeId}
  />
      )}

    <table border="1">
  <thead>
    <tr>
      <th>Ime/Naziv</th>
      <th>Kontaktna oseba</th>
      <th>Telefon</th>
      <th>E-naslov</th>
      <th>Naslov</th>
      <th>Dejanje</th>
    </tr>
  </thead>

  <tbody>
    {dobavitelji.map((dobavitelj) => (
      <tr key={dobavitelj.id}>
        <td>{dobavitelj.ime_ali_naziv}</td>
        <td>{dobavitelj.kontakt_oseba}</td>
        <td>{dobavitelj.telefon}</td>
        <td>{dobavitelj.e_naslov}</td>
        <td>{dobavitelj.naslov}</td>
        <td>
          <button onClick={() => zacniUrejanje(dobavitelj)}>
            Izmeni
          </button>
          <button onClick={() => izbrisiDobavitelja(dobavitelj.id)}>
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

export default Dobavitelji;
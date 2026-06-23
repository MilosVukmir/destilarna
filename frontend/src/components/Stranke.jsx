import { useEffect, useState } from "react";

function Stranke(){

    const [ stranke, setStranke ] = useState([]);

    const [ iskanje, setIskanje ] = useState("");

    useEffect(() => {
        const fetchStranke = async () => {
            const response = await fetch(
                `http://localhost:3000/stranke?iskanje=${iskanje}`
            );
        
            const data = await response.json();
            setStranke(data);
        };
        fetchStranke();
    },[iskanje]);

     return (
    <>
      <div className="content-header">
        <h2>Stranke</h2>
      </div>

      <input
        className="form-control search-input"
        type="text"
        placeholder="Išči stranko..."
        value={iskanje}
        onChange={(e) => setIskanje(e.target.value)}
      />

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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Stranke;
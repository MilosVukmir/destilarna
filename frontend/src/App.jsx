import { useEffect, useState } from "react";

function App(){

  const [dobavitelji, setDobavitelji] = useState([]);

  useEffect(() => {
    const fetchDobavitelji = async () =>  {
      const response = await fetch(
        "http://localhost:3000/dobavitelji"
      );

      const data = await response.json();

      setDobavitelji(data);
    };
    fetchDobavitelji();
  }, []);
  return(
    <>
    <h1>Destilarna</h1>
    {dobavitelji.map((dobavitelj) => (
     <div key={dobavitelj.id}>
      {dobavitelj.ime_ali_naziv}
     </div> 
    ))}
    </>
  );
}

export default App;
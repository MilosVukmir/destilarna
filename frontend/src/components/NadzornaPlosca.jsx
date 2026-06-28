import { useEffect, useState } from "react";
import { API_URL } from "../config/api";

function NadzornaPlosca(){

    const [podatki, setPodatki] = useState({ dobavitelji: 0,
                                             destilacije: 0,
                                             prodaja: 0,
                                             stranke: 0,
                                            });

    const najvecaVrednost = Math.max( podatki.dobavitelji,
                                      podatki.destilacije,
                                      podatki.prodaja,
                                      podatki.stranke,
                                        1
                                    );

    const visinaStuba = (vrednost) => {
        return `${(vrednost / najvecaVrednost) * 220}px`;
    };

    useEffect(() => {
        const fetchPodatki = async () => {
        const response = await fetch(`${API_URL}/nadzornaplosca`);
        const data = await response.json();
        setPodatki(data);
    };

    fetchPodatki();

        const interval = setInterval(fetchPodatki, 5000);
        return () => clearInterval(interval);
    }, []);

     return (
    <>
      <h2 className="mb-4">Nadzorna plošča</h2>

      <div className="dashboard-cards">
        <div className="dashboard-card card-orange">
          <p>Skupaj dobaviteljev</p>
          <h1>{podatki.dobavitelji}</h1>
        </div>

        <div className="dashboard-card card-brown">
          <p>Skupne destilacije</p>
          <h1>{podatki.destilacije}</h1>
        </div>

        <div className="dashboard-card card-red">
          <p>Skupna prodaja</p>
          <h1>{podatki.prodaja}</h1>
        </div>

        <div className="dashboard-card card-green">
          <p>Skupnih strank</p>
          <h1>{podatki.stranke}</h1>
        </div>
      </div>

       <div className="dashboard-chart">
        <h4>Pregled</h4>

        <div className="fake-chart">
          <div className="bar" style={{height: visinaStuba(podatki.dobavitelji)}}>
            <span>Dobavitelji</span>
          </div>

          <div className="bar" style={{height: visinaStuba(podatki.destilacije)}}>
            <span>Destilacije</span>
          </div>

          <div className="bar" style={{height: visinaStuba(podatki.prodaja)}}>
            <span>Prodaja</span>
          </div>

          <div className="bar" style={{height: visinaStuba(podatki.stranke)}}>
            <span>Stranke</span>
          </div>
        </div>
    </div>
    </>
    )
}

export default NadzornaPlosca;
import { NavLink } from "react-router-dom";

import dashboardIcon from "../assets/icons/dashboardWhite.png";
import dobaviteljIcon from "../assets/icons/userWhite.png";
import sadjeIcon from "../assets/icons/fruitsWhite.png";
import prevzemsadjaIcon from "../assets/icons/boxWhite.png";
import fermentacijaIcon from "../assets/icons/chemistryWhite.png";
import destilacijaIcon from "../assets/icons/observatoryWhite.png";
import serijazganjaIcon from "../assets/icons/user-guideWhite.png";
import sodiIcon from "../assets/icons/barrelWhite.png";
import strankeIcon from "../assets/icons/friends-fotorWhite.png";
import prodajaIcon from "../assets/icons/euroWhite.png";
import uporavljanjeIcon from "../assets/icons/settings-fotorWhite.png";


function Sidebar() {

  const user = JSON.parse(localStorage.getItem("user"));

    return(
        <div className="sidebar" style={{ width: "240px" }}>

      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink className={({isActive}) => isActive ? "nav-link active" : "nav-link"} to="/">
            <img src={dashboardIcon}
                 alt="Dashboard"
                 width="20"
                 height="20"
                 className="me-2"/>
                 Nadzorna plošča</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({isActive}) => isActive ? "nav-link active" : "nav-link"} to="/dobavitelji">
            <img src={dobaviteljIcon}
                 alt="DobaviteljIcon"
                 width="20"
                 height="20"
                 className="me-2"/>
                 Dobavitelji</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({isActive}) => isActive ? "nav-link active" : "nav-link"} to="/sadje">
            <img src={sadjeIcon}
                 alt="SadjeIcon"
                 width="20"
                 height="20"
                 className="me-2"/>
                 Sadje</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({isActive}) => isActive ? "nav-link active" : "nav-link"} to="/prevzemsadja">
            <img src={prevzemsadjaIcon}
                 alt="PrevzemsadjaIcon"
                 width="20"
                 height="20"
                 className="me-2"/>
                 Prevzem sadja</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({isActive}) => isActive ? "nav-link active" : "nav-link"} to="/fermentacija">
            <img src={fermentacijaIcon}
                 alt="FermentacijaIcon"
                 width="20"
                 height="20"
                 className="me-2"/>
                 Fermentacija</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({isActive}) => isActive ? "nav-link active" : "nav-link"} to="/destilacija">
            <img src={destilacijaIcon}
                 alt="DestilacijaIcon"
                 width="20"
                 height="20"
                 className="me-2"/>
                 Destilacija</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({isActive}) => isActive ? "nav-link active" : "nav-link"} to="/serijazganja">
            <img src={serijazganjaIcon}
                 alt="SerijazganjaIcon"
                 width="20"
                 height="20"
                 className="me-2"/>
                 Serije žganja</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({isActive}) => isActive ? "nav-link active" : "nav-link"} to="/sodi">
            <img src={sodiIcon}
                 alt="SodiIcon"
                 width="20"
                 height="20"
                 className="me-2"/>
                 Sodi</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({isActive}) => isActive ? "nav-link active" : "nav-link"} to="/stranke">
            <img src={strankeIcon}
                 alt="StrankeIcon"
                 width="20"
                 height="20"
                 className="me-2"/>
                 Stranke</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({isActive}) => isActive ? "nav-link active" : "nav-link"} to="/prodaja">
            <img src={prodajaIcon}
                 alt="ProdajaIcon"
                 width="20"
                 height="20"
                 className="me-2"/>
                 Prodaja</NavLink>
        </li>
        {user?.vloga === "administrator" && (
          <>
        <div className="sidebar-section">
        <div className="sidebar-line"></div>
        <span>ADMIN</span>
        </div>

         <li className="nav-item">
          <NavLink className={({isActive}) => isActive ? "nav-link active" : "nav-link"} to="/uporabniki">
            <img src={uporavljanjeIcon}
                 alt="UpravljanjeIcon"
                 width="20"
                 height="20"
                 className="me-2"/>
                 Upravljanje</NavLink>
        </li>
        </>
        )}
      </ul>
    </div>
    );
}

export default Sidebar;
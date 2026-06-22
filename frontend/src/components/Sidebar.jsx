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


function Sidebar() {
    return(
        <div className="sidebar" style={{ width: "240px" }}>

      <ul className="nav flex-column">
        <li className="nav-item">
          <a className="nav-link" href="#">
            <img src={dashboardIcon}
                 alt="Dashboard"
                 width="20"
                 height="20"
                 className="me-2"/>
                 Nadzorna plošča</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            <img src={dobaviteljIcon}
                 alt="DobaviteljIcon"
                 width="20"
                 height="20"
                 className="me-2"/>
                 Dobavitelji</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            <img src={sadjeIcon}
                 alt="SadjeIcon"
                 width="20"
                 height="20"
                 className="me-2"/>
                 Sadje</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            <img src={prevzemsadjaIcon}
                 alt="PrevzemsadjaIcon"
                 width="20"
                 height="20"
                 className="me-2"/>
                 Prevzem sadja</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            <img src={fermentacijaIcon}
                 alt="FermentacijaIcon"
                 width="20"
                 height="20"
                 className="me-2"/>
                 Fermentacija</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            <img src={destilacijaIcon}
                 alt="DestilacijaIcon"
                 width="20"
                 height="20"
                 className="me-2"/>
                 Destilacija</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            <img src={serijazganjaIcon}
                 alt="SerijazganjaIcon"
                 width="20"
                 height="20"
                 className="me-2"/>
                 Serije žganja</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            <img src={sodiIcon}
                 alt="SodiIcon"
                 width="20"
                 height="20"
                 className="me-2"/>
                 Sodi</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            <img src={strankeIcon}
                 alt="StrankeIcon"
                 width="20"
                 height="20"
                 className="me-2"/>
                 Stranke</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            <img src={prodajaIcon}
                 alt="ProdajaIcon"
                 width="20"
                 height="20"
                 className="me-2"/>
                 Prodaja</a>
        </li>
      </ul>
    </div>
    );
}

export default Sidebar;
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Fermentacija from "./components/Fermentacija.jsx";
import "./App.css";
function App(){

  return(
    <>
    <Header/>
    <div className="d-flex app-layout">
    <Sidebar/>
    <div className="content">
    <Fermentacija/> 
    </div>
    </div>
    </>
  );
}

export default App;
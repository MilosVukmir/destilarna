import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx"
import Prodaja from "./components/Prodaja.jsx";
import "./App.css";

function App(){

  return(
    <>
    <Header/>
    <div className="d-flex app-layout">
    <Sidebar/>
    <div className="content">
    <Prodaja/> 
    </div>
    </div>
    </>
  );
}

export default App;
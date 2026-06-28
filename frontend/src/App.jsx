import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Destilacija from "./components/Destilacija.jsx";
import "./App.css";
function App(){

  return(
    <>
    <Header/>
    <div className="d-flex app-layout">
    <Sidebar/>
    <div className="content">
    <Destilacija/> 
    </div>
    </div>
    </>
  );
}

export default App;
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import NadzornaPlosca from "./components/NadzornaPlosca.jsx";
import "./App.css";
function App(){

  return(
    <>
    <Header/>
    <div className="d-flex app-layout">
    <Sidebar/>
    <div className="content">
    <NadzornaPlosca/> 
    </div>
    </div>
    </>
  );
}

export default App;
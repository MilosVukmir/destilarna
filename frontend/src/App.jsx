import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx"
import Stranke from "./components/Stranke.jsx";
import "./App.css";

function App(){

  return(
    <>
    <Header/>
    <div className="d-flex app-layout">
    <Sidebar/>
    <div className="content">
    <Stranke/> 
    </div>
    </div>
    </>
  );
}

export default App;
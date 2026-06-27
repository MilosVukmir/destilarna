import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx"
import Sodi from "./components/Sodi.jsx";
import "./App.css";

function App(){

  return(
    <>
    <Header/>
    <div className="d-flex app-layout">
    <Sidebar/>
    <div className="content">
    <Sodi/> 
    </div>
    </div>
    </>
  );
}

export default App;
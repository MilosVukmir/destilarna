import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx"
import Sadje from "./components/Sadje.jsx";
import "./App.css";

function App(){

  return(
    <>
    <Header/>
    <div className="d-flex app-layout">
    <Sidebar/>
    <div className="content">
    <Sadje/> 
    </div>
    </div>
    </>
  );
}

export default App;
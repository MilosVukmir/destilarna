import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx"
import SerijaZganja from "./components/SerijaZganja.jsx";
import "./App.css";

function App(){

  return(
    <>
    <Header/>
    <div className="d-flex app-layout">
    <Sidebar/>
    <div className="content">
    <SerijaZganja/> 
    </div>
    </div>
    </>
  );
}

export default App;
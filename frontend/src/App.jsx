import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx"
import PrevzemSadja from "./components/PrevzemSadja.jsx";
import "./App.css";

function App(){

  return(
    <>
    <Header/>
    <div className="d-flex app-layout">
    <Sidebar/>
    <div className="content">
    <PrevzemSadja/> 
    </div>
    </div>
    </>
  );
}

export default App;
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx"
import Dobavitelji from "./components/Dobavitelji.jsx";
import "./App.css";

function App(){

  return(
    <>
    <Header/>

    <div className="d-flex app-layout">
    <Sidebar/>
    <div className="content">
    <Dobavitelji/> 
    </div>
    </div>
    </>
  );
}

export default App;
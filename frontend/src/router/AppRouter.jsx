import { BrowserRouter, Routes, Route } from "react-router";
import "../App.css";

import NadzornaPlosca from "../pages/NadzornaPlosca";
import Sadje from "../pages/Sadje";
import Stranke from "../pages/Stranke";
import Sodi from "../pages/Sodi";
import SerijaZganja from "../pages/SerijaZganja";
import Destilacija from "../pages/Destilacija";
import PrevzemSadja from "../pages/PrevzemSadja";
import Dobavitelji from "../pages/Dobavitelji";
import Fermentacija from "../pages/Fermentacija";
import Prodaja from "../pages/Prodaja";

import Sidebar from "../pages/Sidebar";
import Header from "../pages/Header";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Header />
        <div className="d-flex app-layout">
            <Sidebar />
                <div className="content">
      <Routes>
        <Route path="/" element={<NadzornaPlosca />} />
        <Route path="/dobavitelji" element={<Dobavitelji />} />
        <Route path="/stranke" element={<Stranke />} />
        <Route path="/sadje" element={<Sadje />} />
        <Route path="/prevzemsadja" element={<PrevzemSadja />} />
        <Route path="/serijazganja" element={<SerijaZganja />} />
        <Route path="/sodi" element={<Sodi />} />
        <Route path="/prodaja" element={<Prodaja />} />
        <Route path="/fermentacija" element={<Fermentacija />} />
        <Route path="/destilacija" element={<Destilacija />} />
        <Route path="/nadzornaplosca" element={<NadzornaPlosca />} />
      </Routes>
        </div>
        </div>
    </BrowserRouter>
  );
}
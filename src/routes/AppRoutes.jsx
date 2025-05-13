import { BrowserRouter, Routes, Route } from "react-router-dom";
import Splash from "../pages/Splash";
import Home from "../pages/Home";
import CriarSala from "../pages/CriarSala";
import EntrarSala from "../pages/EntrarSala";
import Preferencias from "../pages/Preferencias";
import Esperando from "../pages/Esperando";
import Resultado from "../pages/Resultado";
import Final from "../pages/Final";

export default function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Splash/>}/>
                <Route path="/home" element={<Home />}/>
                <Route path="/criar" element={<CriarSala />}/>
                <Route path="/sala/:codigo" element={<EntrarSala />}/>
                <Route path="/preferencias" element={<Preferencias />}/>
                <Route path="/esperando" element={<Esperando />}/>
                <Route path="/resultado" element={<Resultado />}/>
                <Route path="/final" element={<Final />}/>
            </Routes>
        </BrowserRouter>
    );
}
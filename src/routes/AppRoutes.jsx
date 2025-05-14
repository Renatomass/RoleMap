import { Route, Routes } from "react-router-dom";
import CriarSala from "../pages/CriarSala";
import EntrarSala from "../pages/EntrarSala";
import Esperando from "../pages/Esperando";
import Final from "../pages/Final";
import Home from "../pages/Home";
import Preferencias from "../pages/Preferencias";
import Resultado from "../pages/Resultado";
import Splash from "../pages/Splash";

export default function AppRoutes(){
    return(
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
    );
}
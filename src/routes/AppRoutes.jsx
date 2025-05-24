import { Route, Routes } from "react-router-dom";
import CriarSala from "../pages/CriarSala";
import EntrarSala from "../pages/EntrarSala";
import Esperando from "../pages/Esperando";
import Final from "../pages/Final";
import Home from "../pages/Home";
import Preferencias from "../pages/Preferencias";
import Resultado from "../pages/Resultado";
import Splash from "../pages/Splash";
import Cadastro from "../pages/Cadastro";
import Apresentacao from "../pages/Apresentacao";

export default function AppRoutes(){
    return(
            <Routes>
                <Route path="/" element={<Splash/>}/>
                <Route path="/apresentacao" element={<Apresentacao/>}/>
                <Route path="/home" element={<Home />}/>
                <Route path="/Cadastro" element={<Cadastro />} />
                <Route path="/criar" element={<CriarSala />}/>
                <Route path="/sala/:codigo" element={<EntrarSala />}/>
                <Route path="/preferencias" element={<Preferencias />}/>
                <Route path="/esperando" element={<Esperando />}/>
                <Route path="/resultado" element={<Resultado />}/>
                <Route path="/final" element={<Final />}/>
            </Routes>
    );
}
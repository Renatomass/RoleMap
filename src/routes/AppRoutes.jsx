import { Route, Routes } from "react-router-dom";
import Splash from "../pages/Splash";
import Apresentacao from "../pages/Apresentacao";
import Home from "../pages/Home";
import Cadastro from "../pages/Cadastro";
import UserSala from "../pages/UserSala";
import TipoRole from "../pages/TipoRole";
import EntrarSala from "../pages/EntrarSala";
import Esperando from "../pages/Esperando";
import Preferencias from "../pages/Preferencias";
import Resultado from "../pages/Resultado";
import Final from "../pages/Final";
import CodeRoom from "../pages/CodeRoom";
import SalaEspera from "../pages/SalaEspera";

export default function AppRoutes(){
    return(
            <Routes>
                <Route path="/" element={<Splash/>}/>
                <Route path="/apresentacao" element={<Apresentacao/>}/>
                <Route path="/home" element={<Home />}/>
                <Route path="/Cadastro" element={<Cadastro />} />
                <Route path="/espera" element={<SalaEspera />} />
                <Route path="/UserSala" element={<UserSala />}/>
                <Route path="/TipoRole" element={<TipoRole />}/>
                <Route path="/sala/convidado" element={<EntrarSala />}/>
                <Route path="/CodeRoom" element={<CodeRoom />}/>
                <Route path="/preferencias" element={<Preferencias />}/>
                <Route path="/esperando" element={<Esperando />}/>
                <Route path="/resultado" element={<Resultado />}/>
                <Route path="/final" element={<Final />}/>
            </Routes>
    );
}
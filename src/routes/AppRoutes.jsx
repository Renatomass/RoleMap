import { Route, Routes } from "react-router-dom";
import Splash from "../pages/Splash";
import Home from "../pages/Home";
import UserSala from "../pages/UserSala";
import UserPrefer from "../pages/UserPrefer";
import SalaCriada from "../pages/SalaCriada";
import EntrarSala from "../pages/EntrarSala";
import Final from "../pages/Final";

export default function AppRoutes(){
    return(
            <Routes>
                <Route path="/" element={<Splash/>}/>
                <Route path="/home" element={<Home />}/>
                <Route path="/UserSala" element={<UserSala />}/>
                <Route path="/preferencias" element={<UserPrefer />}/>
                <Route path="/rolecriado" element={<SalaCriada />}/>
                <Route path="/sala/:codigo" element={<EntrarSala />}/>
                <Route path="/final" element={<Final />}/>
            </Routes>
    );
}
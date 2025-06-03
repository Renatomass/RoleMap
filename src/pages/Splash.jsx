import { Link } from "react-router-dom";
import mapa from "../assets/map.png";
import logo from "../assets/LOGO.svg";

export default function Splash() {
  return (
    <div className="min-h-screen bg-[#403068] flex items-center justify-center px-4 font-[Poppins] overflow-hidden relative">
      {/* Imagem do Mapa */}
      <img src={mapa} alt="Mapa 3D" className="absolute opacity-30  max-w-[600px] min-w-[400px] min-sm:right-250" />

      {/* MEIO DA PAGINA*/}
      <div className="flex flex-col z-1 items-center w-80 text-white text-center max-w-md md:items-center">
        <h1 className="text-left text-8xl font-bold mb-10 leading-18">
          Rolê
          <br />
          Map
        </h1>
        <p className="text-lg mb-6 leading-6 left-0 drop-shadow-2xl">
          Encontre o melhor lugar
          <br />
          para sair com amigos
        </p>

        <Link to="/home">
          <button className="w-80 mb-2 bg-[#723BA6] hover:bg-[#723BA6] text-white font-bold px-6 py-3 rounded-lg drop-shadow-md transition-transform transform hover:scale-105 cursor-pointer">
            Encontre o rolê perfeito
          </button>
        </Link>

        <Link to="/apresentacao">
          <button className="w-80 bg-[#FDBC46] hover:bg-[#FDBC46] text-white font-bold px-6 py-3 rounded-lg drop-shadow-md transition-transform transform hover:scale-105 cursor-pointer">
            O que é o RolêMap?
          </button>
        </Link>
      </div>
      <img
        src={logo}
        alt="Logo App"
        className="absolute  bottom-50% -right-40 w-70 md:w-100 md:-right-50 md: bottom-50%  drop-shadow-xl "
      />
    </div>
  );
}

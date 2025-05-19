import { Link } from "react-router-dom";
import mapa from "../assets/map.png";
import logo from "../assets/LOGO.svg";

export default function Splash() {
  return (
    <div className="min-h-screen bg-[#7927d9] flex items-center justify-start px-0 font-[Poppins]">
      <div className="flex flex-col md:flex-row items-center gap-10 max-w-5xl">
        
        {/* Imagem */}
        <img
          src={mapa}
          alt="Mapa 3D"
          className="w-96 md:w-[500px] drop-shadow-xl hover:scale-105 transition-all"
        />

        {/* Texto + Botão */}
        <div className="text-center md:text-left text-white max-w-md absolute left-3/7">
          <h1 className="text-8xl font-bold leading-22 mb-5">
            Rolê<br /><span className="text-white">Map</span>
          </h1>
          <p className="text-lg mb-4 leading-6">
            Encontre o melhor lugar<br />para sair com amigos
          </p>

          <Link to="/home">
            <button className=" bg-teal-300 hover:bg-teal-400 drop-shadow-xl text-[#ffffff] font-bold px-8 py-3 rounded-lg cursor-pointer hover:scale-105 hover:bg-[] transition-all">
              Encontre o rolê perfeito
            </button>
          </Link>
        </div>
        
          <img
          src={logo}
          alt="Logo App"
          className="w-96 md:w-[250px] drop-shadow-xl hover:scale-105 transition-all absolute left-3/4"
          />

      </div>
    </div>
  );
}

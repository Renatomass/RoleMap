import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/LOGO.svg";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#493971] text-white text-2xl justify-items-center font-[Poppins] pt-[5%]">
      <div className="flex left-1/2">
        <div className="flex text-left text-white max-w-md bottom-[550px] p-20px">
          <img src={logo} alt="Logo App" className="w-25" />
          <h1 className="text-8xl font-bold leading-19 mb-5">
            Rolê
            <br />
            <span className="text-white">Map</span>
          </h1>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg h-100 w-full max-w-sm shadow-xl justify-center z-1">
        <label className="block text-base font-extrabold mt-1 mb-2 text-black">
          Email
        </label>
        <input
          className="w-full p-3 rounded-2xl bg-purple-100 font-[Poppins] text-purple-700 text-xs font-medium"
          type="email"
          placeholder="Email"/>

        <label className="block text-base font-extrabold mt-3 mb-2 text-black">
          Senha
        </label>
        <input
          className="w-full p-3 rounded-2xl bg-purple-100 font-[Poppins] text-purple-700 text-xs font-medium flex"
          type="password"
          placeholder="Senha"/>

        <Link to="/Criar">
          <button
            className="w-full p-2 bg-teal-300 hover:bg-teal-400 text-white font-[Poppins] font-bold mt-3 rounded-2xl text-lg cursor-pointer"
            type="button">
            Entrar
          </button>
        </Link>

        <p className="text-black font-[Poppins] font-medium text-xs text-center mt-1">
          OU
        </p>

        <Link to="/Cadastro">
          <button
            className="w-full p-2 bg-btn-cadastro hover:bg-purple-700 text-white font-[Poppins] font-bold mt-1 rounded-2xl text-lg cursor-pointer transition-all"
            type="button">
            Cadastre-se
          </button>
        </Link>

        <Link to="/sala/:codigo">
          <button
            className="w-full p-2 bg-btn-yellow hover:bg-yellow-500 text-white font-[Poppins] font-bold mt-3 rounded-2xl text-lg cursor-pointer transition-all"
            type="button">
            Entrar com código
          </button>
        </Link>
      </div>
    </div>
  );
}

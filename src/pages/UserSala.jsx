import { Link } from "react-router-dom";
import logo from "../assets/LOGO.svg";

export default function UserSala() {
  return (
    <div className="min-h-screen bg-purple-600 text-white text-2xl justify-items-center font-[Poppins] pt-[5%]">
      <div className="flex text-left text-white max-w-md bottom-[550px] p-20px">
        <img src={logo} alt="Logo App" className="w-25" />
        <h1 className="text-8xl font-bold leading-19 mb-5">
          Rolê
          <br />
          <span className="text-white">Map</span>
        </h1>
      </div>
      <div className="p-8 w-full max-w-sm">
        <Link to="/UserPrefer">
          <button
            className="w-[300px] p-2 bg-btn-yellow hover:bg-yellow-500 text-white font-[Poppins] font-bold mt-3 rounded-2xl text-lg cursor-pointer"
            type="button"
          >
            Criar Rolê
          </button>
        </Link>
        <Link to="/EntrarSala">
          <button
            className="w-[300px] p-2  bg-teal-300 hover:bg-teal-400 text-white font-[Poppins] font-bold mt-3 rounded-2xl text-lg cursor-pointer"
            type="button"
          >
           Entrar com codigo
          </button>
        </Link>
      </div>
    </div>
  );
}

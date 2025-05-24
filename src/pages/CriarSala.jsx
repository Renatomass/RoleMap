import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/bg.png';
import logo from '../assets/LOGO.svg';

export default function HomeScreen() {
  const navigate = useNavigate();

  const handleEntrar = () => {
    navigate(`/sala/:codigo`);
  };
  return (
    <div
      className="flex flex-col items-center justify-center h-screen relative bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="absolute top-6 left-6 flex items-center gap-2 z-10">
        <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
        <span className="text-lg font-bold">user</span>
      </div>
      <div className="z-10 text-center mb-10">
        <div className="flex items-center justify-center gap-4">
          <img src={logo} alt="Rolê Map Logo" className="w-16 h-16" />
          <h1 className="text-6xl font-bold leading-tight">Rolê<br />Map</h1>
        </div>
      </div>
      <div className="z-10 flex flex-col gap-4 w-64">
        <button className="bg-yellow-400 text-white font-bold py-3 rounded-xl hover:opacity-90 transition">
          Criar Rolê
        </button>
        <button
          className="bg-teal-400 text-white font-bold py-3 rounded-xl hover:opacity-90 transition"
          onClick={handleEntrar}>
          Entrar com Código
        </button>
      </div>
    <div className="min-h-screen flex items-center justify-center bg-yellow-500 text-white text-2xl">
      <Link to="/src/routes/AppRoutes.jsx">
          <button
            className="w-full p-2 bg-teal-300 hover:bg-teal-400 text-white font-[Poppins] font-bold mt-3 rounded-2xl text-lg cursor-pointer"
            type="button"
          >
            Entrar
          </button>
        </Link>
    </div>
  );
}

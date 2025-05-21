import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/bg.png'; // certifique-se do caminho correto
import pessoasImage from '../assets/3pessoas.png';
import logo from '../assets/LOGO.svg';

export default function LoginSala() {
  const [codigo, setCodigo] = useState('');
  const navigate = useNavigate();

  const entrarNaSala = () => {
    if (codigo.trim() !== '') {
      navigate('/role');
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
      }}
      className="flex flex-col items-center justify-between px-4 py-6 relative text-white"
    >
      {/* Bolinha + user no canto superior esquerdo */}
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
        <span className="text-sm font-semibold">user</span>
      </div>

      {/* Conteúdo central */}
      <div className="flex flex-col items-center mt-16">
        {/* Logo Rolê Map */}
        <div className="flex items-center mb-6 gap-4">
          <img
            src={logo}
            alt="Rolê Map Logo"
            className="w-20 md:w-24"
          />
          <h1 className="text-4xl font-bold text-center leading-tight">
            Rolê
            <br />
            <span className="text-white">Map</span>
          </h1>
        </div>

        {/* Input do código */}
        <input
          type="text"
          placeholder="Código da sala"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          className="text-center text-purple-700 placeholder-purple-500 font-semibold w-64 md:w-80 p-3 rounded-full mb-4 outline-none bg-white"
        />

        {/* Botão */}
        <button
          onClick={entrarNaSala}
          className="w-64 md:w-80 bg-teal-400 text-white font-semibold p-3 rounded-full transition hover:bg-teal-300"
        >
          Entrar na sala
        </button>
      </div>

      {/* Ilustração no fundo */}
      <img
        src={pessoasImage}
        alt="Três pessoas"
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-40 md:w-56"
      />
    </div>
  );
}

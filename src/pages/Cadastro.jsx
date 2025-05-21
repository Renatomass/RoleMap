import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/LOGO.svg';
import bgImage from '../assets/bg.png';

export default function Cadastro() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nome: '', email: '', senha: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Usuário cadastrado:', form);
    navigate('/home');
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center px-4 relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="flex items-center gap-3 mb-6">
        <img src={logo} alt="Rolê Map" className="w-16 h-16" />
        <h1 className="text-4xl font-extrabold text-white leading-tight drop-shadow-md">
          Rolê Map
        </h1>
      </div>
      <div className="bg-white text-black rounded-xl shadow-lg p-8 w-full max-w-md z-0">
        <h2 className="text-2xl font-bold mb-6 text-center">Criar Conta</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={form.nome}
            onChange={handleChange}
            className="p-3 rounded-full bg-[#f5eefe] placeholder-[#c59dea] focus:outline-none"
            required/>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="p-3 rounded-full bg-[#f5eefe] placeholder-[#c59dea] focus:outline-none"
            required/>
          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={form.senha}
            onChange={handleChange}
            className="p-3 rounded-full bg-[#f5eefe] placeholder-[#c59dea] focus:outline-none"
            required/>
          <button
            type="submit"
            className="bg-[#3ee8d5] text-white font-bold py-3 rounded-full hover:opacity-90 transition">
            Cadastrar
          </button>
          <div className="text-center text-sm font-semibold text-gray-500">OU</div>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="bg-[#8338ec] text-white font-bold py-3 rounded-full hover:opacity-90 transition">
            Já tem conta? Voltar
          </button>
        </form>
      </div>
    </div>
  );
}

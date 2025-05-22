import React from 'react';

export default function Resultado() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#5d2c91] text-white px-4">
      <div className="w-full max-w-md bg-[#402263] rounded-2xl shadow-lg p-6">
        <h2 className="text-center text-2xl font-bold mb-4">O que você achou?</h2>

        <input
          type="text"
          placeholder="Apenas 15 caracteres"
          maxLength={15}
          className="w-full text-center py-2 px-4 rounded-lg bg-white text-black mb-6"
        />

        <div className="flex justify-around mb-6">
          {['João', 'Maria', 'Paulo', 'Julia'].map((nome) => (
            <div key={nome} className="text-center">
              <div className="w-12 h-12 rounded-full bg-white mb-1"></div>
              <p className="text-xs">{nome}</p>
            </div>
          ))}
        </div>

        <div className="bg-white text-black rounded-2xl overflow-hidden">
          <img
            src="/src/assets/restaurante.jpg"
            alt="Imagem do local"
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-bold">Bistrô Solar</h3>
            <div className="flex justify-between items-center text-sm mt-2">
              <span className="text-yellow-500 font-semibold">4.5 ⭐</span>
              <span className="font-semibold">1,5km</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-6 gap-4">
          <button className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg">
            Aceitar
          </button>
          <button className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg">
            Recusar
          </button>
        </div>
      </div>
    </div>
  );
}

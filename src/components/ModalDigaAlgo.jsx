import { useState } from "react";

export default function ModalDigaAlgo({ onFechar, onEnviar }) {
  const [mensagem, setMensagem] = useState("");

  const handleChange = (e) => {
    if (e.target.value.length <= 15) {
      setMensagem(e.target.value);
    }
  };

  return (
    <div
      onClick={onFechar}
      className="fixed inset-0 z-50 bg-[#2c125744] bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white flex flex-col justify-center items-center rounded-2xl shadow-xl w-full max-w-sm p-6 text-center animate-fade-up"
      >
        <h2 className="text-lg font-bold text-purple-700 mb-3">
          🗣️ Fale com seus amigos!🌎
        </h2>
        <input
          type="text"
          value={mensagem}
          onChange={handleChange}
          placeholder="Escreva (Até 15 caracteres)"
          className="w-full border border-purple-300 rounded-xl px-4 py-3 mb-4 text-gray-700 focus:outline-none focus:ring-purple-500 cursor-pointer"
        />
        <div className="flex justify-center gap-3">
          <button
            onClick={() => onEnviar(mensagem)} 
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-xl transition cursor-pointer"
          >
            Enviar
          </button>
          <button
            onClick={onFechar}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-xl transition cursor-pointer"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

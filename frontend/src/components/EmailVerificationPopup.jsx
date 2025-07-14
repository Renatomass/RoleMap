import { useState } from "react";

export default function EmailVerificationPopup({ onConfirm, onClose }) {
  const [codigo, setCodigo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!codigo) return;
    onConfirm && onConfirm(codigo);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl px-6 py-8 max-w-sm w-full text-center animate-fade-in-up">
        <h2 className="text-xl font-bold text-purple-700 mb-4">Verifique seu email</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="Código de 6 dígitos"
            className="w-full border border-purple-300 rounded-xl px-4 py-3 text-gray-700 focus:outline-none"
          />
          <div className="flex justify-center gap-3">
            <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-xl transition-all cursor-pointer">
              Confirmar
            </button>
            <button type="button" onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-xl transition-all cursor-pointer">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

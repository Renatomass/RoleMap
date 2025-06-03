export default function ModalNaoVotou({ onAceitar, onRecusar }) {
  return (
    <div
      onClick={onRecusar}
      className="fixed inset-0 z-50 bg-[#2c125744] bg-opacity-50 backdrop-blur-sm flex items-center justify-center px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white text-center text-gray-800 rounded-2xl shadow-2xl w-full max-w-sm p-6 animate-fade-up"
      >
        <h2 className="text-xl font-bold text-purple-700 mb-4">⏰ Você não votou!</h2>
        <p className="mb-6">Deseja aceitar o rolê antes que o tempo acabe?</p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onAceitar}
            className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-xl shadow-md transition"
          >
            ✅ Sim
          </button>
          <button
            onClick={onRecusar}
            className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-xl shadow-md transition"
          >
            ❌ Não
          </button>
        </div>
      </div>
    </div>
  );
}

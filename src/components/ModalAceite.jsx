export default function ModalAceito({ onFechar }) {
  return (
    <div className="fixed inset-0 z-50 bg-[#2c125744] bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl text-center px-6 py-8 max-w-sm w-full animate-fade-in-up">

        <h2 className="text-2xl font-pdr font-bold text-purple-700 mb-4">🎉 Você topou esse rolê!</h2>
        <p className="text-gray-600 mb-6">Agora é só esperar a galera votar. 😉</p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onFechar}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-xl transition-all shadow-md cursor-pointer"
          >
            Ok!
          </button>
        </div>
      </div>
    </div>
  );
}

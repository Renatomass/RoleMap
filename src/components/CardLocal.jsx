export default function CardLocal({ imagem, nome, nota, distancia }) {
  return (
    <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden text-purple-900">
      <img
        src={imagem}
        alt={nome}
        className="w-full h-90 object-cover"
      />
      <div className="p-4 flex flex-col gap-1">
        <h2 className="text-2xl font-bold">{nome}</h2>
        <div className="flex justify-between text-sm text-gray-700">
          <span className="flex items-center gap-1">⭐ {nota}</span>
          <span className="flex items-center gap-1">📍 {distancia}</span>
        </div>

        <div className="flex gap-4 mt-4">
          <button className="flex-1 bg-green-300 hover:bg-green-400 text-green-900 font-bold py-2 rounded-xl transition">
            Aceitar
          </button>
          <button className="flex-1 bg-red-200 hover:bg-red-300 text-red-700 font-bold py-2 rounded-xl transition">
            Recusar
          </button>
        </div>
      </div>
    </div>
  );
}

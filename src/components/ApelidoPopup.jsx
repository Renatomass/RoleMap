export default function ApelidoPopup ({apelido, setApelido, onConfirmar, onCancelar, erro, animar}) {

    const handleApelidoConfirmar = () => {
  if (codigoDigitado.trim().toUpperCase() === "ROLE123") {
    setCodigoSala("ROLE123");
    navigate("/CodeRoom");
  } else {
    setErroApelido(true);
    setTimeout(() => setErroApelido(false), 800);
  }
};


    return (
    <div className="fixed inset-0 flex items-center justify-center z-50 opacity-98 backdrop-blur-sm animate-fade">
        <div className={`relative border-5 border-purple-700 bg-white text-shadow-purple-900 p-6 rounded-xl shadow-xl w-full max-w-sm ${animar ? "animate-popup-in" : "animate-popup-out"}`}>
            <h2 className="text-xl text-purple-600 font-bold mb-4">Apelido:</h2>
                <input 
                    type="text"
                    value={apelido}
                    onChange={(e) => setApelido(e.target.value)}
                    className={`w-full p-2 rounded mb-4 bg-purple-100 text-purple-700 text-sm font-pdr focus:outline-0 transition-all duration-200 ${erro ? "bg-red-200 animate-shake" : "border-gray-300"}`}
                    placeholder="Digite seu apelido"
                />
                <div className="flex justify-end gap-2 font-pdr font-bold">
                    <button 
                        onClick={onCancelar}
                        className="font-pdr px-4 py-2 bg-[#FF7768] hover:bg-[#ED5A49] rounded cursor-pointer">Cancelar
                    </button>
                    <button 
                        onClick={onConfirmar}
                        className="px-4 py-2  bg-teal-300 hover:bg-teal-400 text-white rounded cursor-pointer">OK
                    </button>
                </div>
        </div>
    </div>
    );
}
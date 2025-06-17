import { useEffect, useState } from "react";
import { useUser } from "../context/UseContext";
import MapPiner from "./MapPiner"; 

export default function ApelidoPopup({ apelido, setApelido, onConfirmar, onCancelar, erro, animar }) {
  const { setNomeConvidado, setLocalizacao } = useUser();
  const [etapa, setEtapa] = useState(1);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (etapa === 2) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        () => {
          setPosition({ lat: -3.73, lng: -38.52 }); 
        }
      );
    }
  }, [etapa]);

  const handleAvancar = () => {
    if (apelido.trim().length === 0) return;
    setEtapa(2);
  };

  const handleConfirmar = () => {
    if (!position) return;
    setNomeConvidado(apelido.trim());
    setLocalizacao(`${position.lat.toFixed(6)},${position.lng.toFixed(6)}`)
    onConfirmar(); 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 opacity-98 backdrop-blur-sm animate-fade">
      <div className={`relative border-5 border-purple-700 bg-white text-shadow-purple-900 p-6 rounded-xl shadow-xl w-full max-w-sm ${animar ? "animate-popup-in" : "animate-popup-out"}`}>
        {etapa === 1 && (
          <>
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
                className="font-pdr px-4 py-2 bg-[#FF7768] hover:bg-[#ED5A49] rounded cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleAvancar}
                className="px-4 py-2 bg-teal-300 hover:bg-teal-400 text-white rounded cursor-pointer"
              >
                Avançar
              </button>
            </div>
          </>
        )}

        {etapa === 2 && (
          <>
            <h2 className="text-xl text-purple-600 font-bold mb-4">Sua localização:</h2>
            <div className="mb-4 rounded overflow-hidden cursor-pointer">
              {position && (
                <MapPiner location={position} onLocationSelect={setPosition} />
              )}
            </div>
            <div className="flex justify-end gap-2 font-pdr font-bold">
              <button
                onClick={onCancelar}
                className="font-pdr px-4 py-2 bg-[#FF7768] hover:bg-[#ED5A49] rounded cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmar}
                className="px-4 py-2 bg-teal-300 hover:bg-teal-400 text-white rounded cursor-pointer"
              >
                OK
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

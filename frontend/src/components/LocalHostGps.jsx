import { useEffect, useState } from "react";
import { useUser } from "../context/UseContext";
import MapPiner from "./MapPiner";

export default function LocalHostGps({ onConfirmar, onCancelar, animar }) {
  const { setLocalizacao } = useUser();
  const [position, setPosition] = useState(null);

  useEffect(() => {
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
  }, []);

  const handleConfirmar = () => {
    if (!position) return;
    setLocalizacao(`${position.lat.toFixed(6)},${position.lng.toFixed(6)}`);
    onConfirmar();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 opacity-98 backdrop-blur-sm animate-fade">
      <div className={`relative border-5 border-purple-700 bg-white text-shadow-purple-900 p-6 rounded-xl shadow-xl w-full max-w-sm ${animar ? "animate-popup-in" : "animate-popup-out"}`}>
        <h2 className="text-xl text-purple-600 font-bold mb-4">Confirme sua localização:</h2>
        <div className="mb-4 rounded overflow-hidden cursor-pointer">
          {position && (
            <MapPiner location={position} onLocationSelect={setPosition} />
          )}
        </div>
        <div className="flex justify-end gap-2 font-pdr font-bold">
          <button
            onClick={onCancelar}
            className="px-4 py-2 bg-[#FF7768] hover:bg-[#ED5A49] rounded cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirmar}
            className="px-4 py-2 bg-teal-300 hover:bg-teal-400 text-white rounded cursor-pointer"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

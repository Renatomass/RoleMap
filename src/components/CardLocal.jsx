import { useState } from "react";
import ModalAceito from "./ModalAceite";
import ModalRecusado from "./ModalRecusado";
import ModalNaoVotou from "./ModalNaoVotou";
import Timer from "./Timer";

export default function CardLocal({ imagem, nome, nota, distancia }) {
  const [mostrarModalAceito, setMostrarModalAceito] = useState(false);
  const [mostrarModalRecusado, setMostrarModalRecusado] = useState(false);
  const [mostrarModalNaoVotou, setMostrarModalNaoVotou] = useState(false);
  const [votou, setVotou] = useState(false); 

  const handleAlerta = () => {
    if (!votou) {
      setMostrarModalNaoVotou(true);
    }
  };

  const votarAceitar = () => {
    setVotou(true);
    setMostrarModalAceito(true);
  };

  const votarRecusar = () => {
    setVotou(true);
    setMostrarModalRecusado(true);
  };

  const votarNoPopup = (aceitou) => {
    setVotou(true);
    setMostrarModalNaoVotou(false);
    if (aceitou) {
      setMostrarModalAceito(true);
    } else {
      setMostrarModalRecusado(true);
    }
  };

  return (
    <div className="w-full h-100 mt-10 sm:mt-10 max-w-sm rounded-3xl shadow-2xl text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#000000] to-[#0004ff] z-0"></div>
      <img
        src={imagem}
        alt={nome}
        className="absolute inset-0 w-full h-full object-cover opacity-40 z-0"
      />

      <div className="relative z-10 px-4 pt-4 pb-6">
        <Timer tempoInicial={30} onAlerta={handleAlerta} />
        <div className="relative mt-50">
          <h2 className="text-2xl px-2 font-bold drop-shadow-md">{nome}</h2>
          <div className="flex justify-between px-3 text-base font-pdr font-bold text-purple-200 my-1.5">
            <span className="flex items-center gap-1">⭐ {nota}</span>
            <span className="flex items-center gap-1">📍{distancia}</span>
          </div>
        </div>
        <div className="flex gap-4 mt-3">
          <button
            onClick={votarAceitar}
            className="flex-1 bg-green-500 hover:bg-green-400 text-white font-semibold py-2 rounded-xl transition-all shadow-md cursor-pointer"
          >
            ✅ Aceitar
          </button>
          <button
            onClick={votarRecusar}
            className="flex-1 bg-red-600 hover:bg-red-800 text-white font-semibold py-2 rounded-xl transition-all shadow-md cursor-pointer"
          >
            ❌ Recusar
          </button>
        </div>
      </div>

      {mostrarModalAceito && <ModalAceito onFechar={() => setMostrarModalAceito(false)} />}
      {mostrarModalRecusado && <ModalRecusado onFechar={() => setMostrarModalRecusado(false)} />}
      {mostrarModalNaoVotou && (
        <ModalNaoVotou
          onAceitar={() => votarNoPopup(true)}
          onRecusar={() => votarNoPopup(false)}
        />
      )}
    </div>
  );
}

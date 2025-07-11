import logo from "../assets/LOGO.svg";
import { useEffect } from "react";
import { useUser } from "../context/UseContext";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import socket from "../services/sockets";
import { error } from "../utils/logger";
import Feedback from "./Feedback";



export default function PopupBuscando({ mostrar, participantes = [], mensagens = [] }) {
  const { salaId, codigoSala, setSugestaoFinal } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!mostrar) return;
    const buscarSugestao = async () => {
      if (!salaId) return;

      try {
        const response = await api.post("/sala/sugestao", {
          salaId,
        });

        setSugestaoFinal(response.data);
        socket.emit("enviar_sugestao", {
          codigo: codigoSala,
          sugestao: response.data,
        });
        navigate("/resultado");
         } catch (err) {
          error("❌ Erro ao buscar sugestão:", err);
        }
      };

    buscarSugestao();
  }, [mostrar, salaId, navigate, setSugestaoFinal]);

  if (!mostrar) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-[#2c1257] p-10 rounded-3xl shadow-lg flex flex-col items-center gap-6 animate-fade-in w-full max-w-md">
        <img src={logo} alt="Logo App" className="w-20 h-20" />
        <p className="text-white text-xl font-bold animate-pulse">
          Buscando o rolê perfeito...
        </p>
        {participantes.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {participantes.map((p, i) => {
              const nome = typeof p === "string" ? p : p?.apelido || "?";
              const letra = nome.charAt(0).toUpperCase();
              return (
                <div
                  key={i}
                  className="flex flex-col items-center bg-[#ffffff1a] rounded-xl p-2 w-16"
                >
                  <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
                    {letra}
                  </div>
                  <span className="text-white text-xs mt-1 truncate w-full text-center">
                    {nome}
                  </span>
                </div>
              );
            })}
          </div>
        )}
        {mensagens.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mt-6 w-full">
            {mensagens.slice(-4).map((m, i) => (
              <Feedback key={i} nome={m.nome} msg={m.mensagem} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

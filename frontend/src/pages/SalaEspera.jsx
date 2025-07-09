import { useEffect, useState } from "react";
import { useUser } from "../context/UseContext";
import PageWrapper from "../components/PageWrapper";
import socket from "../services/sockets";
import PopupBuscando from "../components/PopupBuscando";
import { useNavigate } from "react-router-dom";
import { log } from "../utils/logger";


export default function SalaEspera() {
  const { codigoSala, nomeRole, setNomeRole, setSugestaoFinal, user } = useUser();
  const [participantes, setParticipantes] = useState([]);
  const [buscando, setBuscando] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    if (!nomeRole) {
      const nomeSalvo = localStorage.getItem("nomeRole");
      if (nomeSalvo) {
        setNomeRole(nomeSalvo);
      }
    }
  }, []);

  useEffect(() => {
  socket.on("mostrar_popup_busca", () => {
    log("🔄 Recebido: mostrar_popup_busca");
    setBuscando(true);
  });

  return () => {
    socket.off("mostrar_popup_busca");
  };
}, []);


  useEffect(() => {
    socket.on("nova_sugestao", (dados) => {
      setSugestaoFinal(dados);
      navigate("/resultado");
    });
    return () => {
      socket.off("nova_sugestao");
    };
  }, [navigate, setSugestaoFinal]);


  useEffect(() => {
    if (codigoSala) {
      socket.emit("listar_participantes", codigoSala);

      socket.on("atualizar_participantes", (lista) => {
        log("Participantes recebidos:", lista);
        setParticipantes(lista);
      });

      return () => {
        socket.off("atualizar_participantes");
      };
    }
  }, [codigoSala]);

  useEffect(() => {
    if (participantes.length > 0 && codigoSala) {
      socket.emit("quantidade_participantes", {
        codigo: codigoSala,
        total_convidados: participantes.length,
      });
    }
  }, [participantes]);

  if (!codigoSala) {
    return (
      <PageWrapper>
        <div className="text-white text-center mt-10">
          <h2 className="text-xl font-semibold">Carregando dados da sala...</h2>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="text-white text-center flex flex-col items-center gap-6 -mt-16">
        <h1 className="text-3xl font-bold">⏳ Sala de Espera</h1>
        <h2 className="text-xl font-semibold bg-purple-800 px-4 py-2 rounded-xl shadow-md">
          Rolê: {nomeRole}
        </h2>

        <div className="text-sm text-white/70">
          Amigos na sala: {participantes.length}
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {participantes.map((p, index) => (
            <div
              key={index}
              className="bg-purple-800 px-4 py-2 rounded-xl shadow-md"
            >
              {typeof p === "string" ? p : p?.apelido || "Convidado"}
            </div>
          ))}
        </div>
        {user && (
          <button className="mt-10 px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-xl font-bold">
            Começar votação
          </button>
        )}
      </div>
    </PageWrapper>
  );
}

import { useEffect, useState } from "react";
import { useUser } from "../context/UseContext";
import PageWrapper from "../components/PageWrapper";
import socket from "../services/sockets";

export default function SalaEspera() {
  const { codigoSala, nomeRole } = useUser();
  const [participantes, setParticipantes] = useState([]);

  useEffect(() => {
    // Ouve atualizações de participantes
    socket.on("atualizar_participantes", (lista) => {
      setParticipantes(lista);
    });

    // Remove o listener ao desmontar o componente
    return () => {
      socket.off("atualizar_participantes");
    };
  }, []);

  // Evita renderização caso a sala ainda esteja sendo carregada
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
      <div className="text-white text-center flex flex-col items-center gap-6 mt-10">
        <h1 className="text-3xl font-bold">⏳ Sala de Espera</h1>
        <h2 className="text-xl font-semibold">Rolê: {nomeRole}</h2>

        <div className="text-sm text-white/70">
          Amigos na sala: {participantes.length}
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {participantes.map((p, index) => (
            <div
              key={index}
              className="bg-purple-800 px-4 py-2 rounded-xl shadow-md"
            >
              {p.apelido || "Convidado"}
            </div>
          ))}
        </div>

        <button className="mt-10 px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-xl font-bold">
          Começar votação
        </button>
      </div>
    </PageWrapper>
  );
}

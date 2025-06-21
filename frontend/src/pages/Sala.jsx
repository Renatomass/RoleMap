import { useEffect, useState } from "react";
import socket from "../services/socket"; // 🔗 importa a conexão



function Sala({ codigo, apelido }) {
  const [participantes, setParticipantes] = useState([]);

  useEffect(() => {
    // 🚪 Entra na sala
    socket.emit("entrar_na_sala", { codigo, apelido });

    // 🔄 Atualiza lista de participantes
    socket.on("atualizar_participantes", (dados) => {
      setParticipantes(dados);
    });

    // 📍 Localização atualizada
    socket.on("localizacao_atualizada", (dados) => {
      console.log("📍 Localização:", dados);
    });

    // 🚦 Quando votação inicia
    socket.on("votacao_iniciada", () => {
      alert("🚦 Votação foi iniciada!");
    });

    // 🧹 Limpeza dos listeners ao sair do componente
    return () => {
      socket.off("atualizar_participantes");
      socket.off("localizacao_atualizada");
      socket.off("votacao_iniciada");
    };
  }, [codigo, apelido]);

  return (
    <div>
      <h2>Sala {codigo}</h2>
      <h3>Participantes:</h3>
      <ul>
        {participantes.map((p) => (
          <li key={p.id}>{p.apelido}</li>
        ))}
      </ul>
    </div>
  );
}

export default Sala;

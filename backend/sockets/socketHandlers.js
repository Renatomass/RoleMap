const salas = {};

export default (io, socket) => {
  

  socket.on("entrar_na_sala", ({ codigo, apelido }) => {
    socket.join(codigo);
    console.log(`🟣 ${apelido || "Usuário"} (${socket.id}) entrou na sala ${codigo}`);
    // 🔗 Participante entra na sala
    io.to(codigo).emit('participante_entrou', { id: socket.id, apelido });

    if (!salas[codigo]) {
      salas[codigo] = [];
    }

    // Adiciona participante se ainda não estiver na sala
    if (!salas[codigo].some((p) => p.id === socket.id)) {
      salas[codigo].push({
        id: socket.id,
        apelido,
        localizacao: null, // ✅ Adiciona campo de localização
      });
    }

    // Notifica todos da sala
    io.to(codigo).emit("atualizar_participantes", salas[codigo]);
  });

  // 🚀 Atualiza localização dos participantes
  socket.on("atualizar_localizacao", async ({ codigo, latitude, longitude }) => {
    const sala = salas[codigo];
    if (sala) {
      const participante = sala.find(p => p.id === socket.id);
      if (participante) {
        participante.localizacao = { latitude, longitude };
        
        // Salvar no banco (exemplo com mongoose)
        const Localizacao = require('../models/Localizacao');
        await Localizacao.findOneAndUpdate(
          { codigoSala: codigo, participanteId: socket.id },
          { latitude, longitude, atualizadoEm: new Date() },
          { upsert: true }
        );
  
        io.to(codigo).emit("localizacao_atualizada", {
          id: socket.id,
          apelido: participante.apelido,
          latitude,
          longitude,
        });
      }
    }
  });
  

  // 🗳️ Evento de iniciar votação (ou evento global)
  socket.on('iniciar_votacao', (codigo) => {
    io.to(codigo).emit('votacao_iniciada');
  });
  

  // ❌ Participante desconectou
  socket.on("disconnect", () => {
    console.log("❌ Usuário desconectado:", socket.id);

    for (const codigo in salas) {
      const sala = salas[codigo];
      salas[codigo] = sala.filter(p => p.id !== socket.id);

      if (salas[codigo].length > 0) {
        io.to(codigo).emit("atualizar_participantes", salas[codigo]);
      } else {
        // 🗑️ Remove sala vazia
        delete salas[codigo];
        console.log(`Sala ${codigo} foi removida por estar vazia.`);
      }
    }
  });
};


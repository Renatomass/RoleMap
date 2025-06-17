const salas = {};

export default (io, socket) => {
  socket.on("entrar_na_sala", ({ codigo, apelido }) => {
    socket.join(codigo);
    console.log(
      `🟣 ${apelido || "Usuario"} (${socket.id}) entrou na sala ${codigo}`
    );
    if (!salas[codigo]) {
      salas[codigo] = [];
    }

    if (!salas[codigo].some((p) => p.id === socket.id)) {
      salas[codigo].push({ id: socket.id, apelido });
    }
    io.to(codigo).emit("atualizar_participantes", {
      participantes: salas[codigo],
      total: salas[codigo].length,
    });
  });

  socket.on("quantidade_participantes", ({ codigo, total_convidados }) => {
  console.log(`Sala ${codigo} agora tem ${total_convidados} participantes.`);
});


  socket.on("disconnect", () => {
    console.log("❌ Usuário desconectado:", socket.id);

    for (const codigo in salas) {
      salas[codigo] = salas[codigo].filter((p) => p.id !== socket.id);
      if (salas[codigo].length > 0) {
        io.to(codigo).emit("atualizar_participantes", {
          participantes: salas[codigo],
          total: salas[codigo].length,
        });
      }
    }
  });
};

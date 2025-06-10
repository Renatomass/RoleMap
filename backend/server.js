const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const salaRoutes = require('./routes/salaRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

const salas = {};

io.on("connection", (socket) => {
  console.log("🔌 Novo usuário conectado:", socket.id);

  socket.on("entrar_na_sala", ({ codigo, apelido }) => {
    socket.join(codigo);

    if (!salas[codigo]) salas[codigo] = [];
    salas[codigo].push(apelido);

    io.to(codigo).emit("atualizar_participantes", salas[codigo]);
  });

  socket.on("listar_participantes", (codigo) => {
    io.to(socket.id).emit("atualizar_participantes", salas[codigo] || []);
  });

  socket.on("disconnect", () => {
  });
});

app.use(cors());
app.use(express.json());

app.use("/sala", salaRoutes);
app.use("/usuarios", usuarioRoutes);

app.get('/', (_req, res) => {
  res.send('Servidor está vivo! 🚀');
});

io.on("connection", (socket) => {
  console.log("🔌 Novo usuário conectado:", socket.id);
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

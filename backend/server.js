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

app.use(cors());
app.use(express.json());
app.use("/api", salaRoutes);
app.use("/api", usuarioRoutes);

io.on("connection", (socket) => {
  console.log("🔌 Novo usuário conectado:", socket.id);
  // socketHandlers(io, socket); // Se quiser adicionar depois
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

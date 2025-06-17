const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const salaRoutes = require('./routes/salaRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
require('dotenv').config();
const db = require('./models');


const app = express();
const server = http.createServer(app);

db.sequelize.authenticate()
  .then(() => console.log('✅ Banco de dados conectado'))
  .catch((err) => console.error('Erro ao conectar ao banco:', err));

const io = new Server(server, {
  cors: { origin: "*" }
});

const salas = {};

io.on("connection", (socket) => {
  console.log("🔌 Novo usuário conectado:", socket.id);

  socket.on("entrar_na_sala", ({ codigo, apelido }) => {
    socket.join(codigo);

    if (!salas[codigo]) salas[codigo] = [];

    if (!salas[codigo].some((p) => p.id === socket.id)) {
      salas[codigo].push({ id: socket.id, apelido });
    }
    io.to(codigo).emit("atualizar_participantes", salas[codigo]);
  });

  socket.on("listar_participantes", (codigo) => {
    io.to(socket.id).emit("atualizar_participantes", salas[codigo] || []);
  });

  socket.on("disconnect", () => {
    console.log("❌ Usuário desconectado:", socket.id);

    for (const codigo in salas) {
      const antes = salas[codigo].length;
      salas[codigo] = salas[codigo].filter((p) => p.id !== socket.id);

      if (salas[codigo].length !== antes) {
        if (salas[codigo].length === 0) {
          delete salas[codigo];
        }

        io.to(codigo).emit("atualizar_participantes", salas[codigo]);
      }
    }
  });
});

app.use(cors());
app.use(express.json());

app.use("/sala", salaRoutes);
app.use("/usuarios", usuarioRoutes);

app.get('/', (_req, res) => {
  res.send('Servidor está vivo! 🚀');
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

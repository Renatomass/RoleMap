const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const salaRoutes = require("./routes/salaRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");
require("dotenv").config();
const db = require("./models");
const logger = require("./utils/logger");

const app = express();
const server = http.createServer(app);

const SERVER_URL = process.env.SERVER_URL || "http://localhost";
const PORT = process.env.SERVER_PORT || process.env.PORT || 3001;

db.sequelize
  .authenticate()
  .then(() => logger.log("✅ Banco de dados conectado"))
  .catch((err) => logger.error("Erro ao conectar ao banco:", err));

const io = new Server(server, {
  cors: { origin: "*" },
});

app.set("io", io);
const salas = {};

io.on("connection", (socket) => {
  logger.log("🔌 Novo usuário conectado:", socket.id);
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

  socket.on("iniciar_busca", ({ codigo }) => {
    io.to(codigo).emit("mostrar_popup_busca");
  });

  socket.on("enviar_sugestao", ({ codigo, sugestao }) => {
    io.to(codigo).emit("nova_sugestao", sugestao);
  });

  socket.on("disconnect", () => {
    logger.log("❌ Usuário desconectado:", socket.id);

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

app.get("/", (_req, res) => {
  res.send("Servidor está vivo! 🚀");
});

server.listen(PORT, () => {
  logger.log(`🚀 Servidor rodando em ${SERVER_URL}:${PORT}`);
});

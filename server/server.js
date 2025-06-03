import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

import salaRoutes from "./routes/salaRoutes.js";
import socketHandlers from "./sockets/socketHandlers.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

app.use(cors());
app.use(express.json());
app.use("/api", salaRoutes);

io.on("connection", (socket) => {
  console.log("🔌 Novo usuário conectado:", socket.id);
  socketHandlers(io, socket);
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

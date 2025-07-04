import { io } from "socket.io-client";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost";
const SERVER_PORT = import.meta.env.VITE_SERVER_PORT || "3001";

const socket = io(`${SERVER_URL}:${SERVER_PORT}`);
export default socket;

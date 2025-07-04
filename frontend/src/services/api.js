import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost";
const SERVER_PORT = import.meta.env.VITE_SERVER_PORT || "3001";

export const api = axios.create({
    baseURL: `${SERVER_URL}:${SERVER_PORT}/`
});
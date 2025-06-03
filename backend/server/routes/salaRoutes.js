import express from "express";
import { criarSala } from "../controllers/salaController.js";

const router = express.Router();
router.post("/criar-sala", criarSala);

export default router;

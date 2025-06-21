const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const salaController = require('../controllers/salaController');

router.post('/criar', auth, salaController.criarSala);
router.post('/criar-sala', auth, salaController.criarRole);
router.post('/criar-role', auth, salaController.criarRole);
router.post('/entrar', salaController.entrarComoConvidado);
router.post("/sugestao", salaController.gerarSugestao);
router.post("/votar", salaController.votar);
router.get("/:id/votos", salaController.listarVotos);

        
module.exports = router;

const express = require ('express');
const { criarSala } = require ('../controllers/salaController.js');

const router = express.Router();
router.post("/criar-sala", criarSala);

module.exports = router;

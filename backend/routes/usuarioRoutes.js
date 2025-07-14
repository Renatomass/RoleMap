const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.post('/cadastro', usuarioController.cadastrar);
router.post('/login', usuarioController.login);
router.get('/confirmar/:token', usuarioController.confirmar);
router.post('/verificar-codigo', usuarioController.confirmarCodigo);


module.exports = router;

const express = require('express');
const { cadastrar, login } = require('../controllers/usuarioController');

const router = express.Router();

router.post('/usuarios', cadastrar);
router.post('/login', login);

module.exports = router;

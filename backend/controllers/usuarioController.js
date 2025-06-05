const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const { Usuario } = db;

const JWT_SECRET = process.env.JWT_SECRET || 'secreto-superseguro';

const cadastrar = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const existe = await Usuario.findOne({ where: { email } });
    if (existe) return res.status(400).json({ erro: 'Email já cadastrado' });

    const hash = await bcrypt.hash(senha, 10);
    const novoUsuario = await Usuario.create({ nome, email, senha: hash });

    return res.status(201).json({
      message: 'Usuário cadastrado com sucesso',
      usuario: {
        id: novoUsuario.id,
        nome: novoUsuario.nome,
        email: novoUsuario.email
      }
    });
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao cadastrar usuário', detalhe: err.message });
  }
};

const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) return res.status(401).json({ erro: 'Senha incorreta' });

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    return res.json({
      message: 'Login bem-sucedido',
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      }
    });
  } catch (err) {
    return res.status(500).json({ erro: 'Erro no login', detalhe: err.message });
  }
};

module.exports = { cadastrar, login };

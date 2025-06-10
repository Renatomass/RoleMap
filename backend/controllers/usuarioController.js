const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Usuario } = require("../models");
const usuarioController = {
  async cadastrar(req, res) {
    try {
      const { nome, email, senha } = req.body;

      const usuarioExistente = await Usuario.findOne({ where: { email } });
      if (usuarioExistente) {
        return res.status(400).json({ erro: "Email já cadastrado." });
      }

      const senha_hash = await bcrypt.hash(senha, 10);

      const novoUsuario = await Usuario.create({
        nome,
        email,
        senha_hash,
      });

      const token = jwt.sign(
        {
          id: novoUsuario.id,
          nome: novoUsuario.nome,
          email: novoUsuario.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
      );

      res.status(201).json({
        usuario: {
          id: novoUsuario.id,
          nome: novoUsuario.nome,
          email: novoUsuario.email,
        },
        token: token,
      });
    } catch (error) {
      console.error("Erro no cadastro:", error);
      console.log("🔥 error.response:", error.response);
      console.log("🔥 error.response?.data:", error.response?.data);
    }
  },
//nao mexer daqui pra cima
  async login(req, res) {
    try {
      const { email, senha } = req.body;

      const usuario = await Usuario.findOne({ where: { email } });
      if (!usuario) {
        return res.status(401).json({ erro: "Usuário não encontrado" });
      }

      const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);
      if (!senhaValida) {
        return res.status(401).json({ erro: "Senha incorreta" });
      }

      const token = jwt.sign(
        { id: usuario.id, nome: usuario.nome, email: usuario.email },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
      );

      res.json({
        token,
        usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email },
      });
    } catch (error) {
      res.status(500).json({ erro: "Erro no login", detalhe: error.message });
    }
  },
};

module.exports = usuarioController;

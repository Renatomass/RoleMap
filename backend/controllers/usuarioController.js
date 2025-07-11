const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Usuario } = require("../models");
const logger = require("../utils/logger");
const enviarEmail = require("../utils/mailer");

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

      const verificationToken = jwt.sign(
        { id: novoUsuario.id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      const link = `${process.env.SERVER_URL || "http://localhost"}:${
        process.env.SERVER_PORT || 3001
      }/usuarios/confirmar/${verificationToken}`;
      try {
        await enviarEmail(
          novoUsuario.email,
          "Confirmação de cadastro",
          `Clique no link para confirmar seu cadastro: ${link}`
        );
      } catch (e) {
        logger.error("Erro ao enviar email de confirmação:", e);
      }

      res.status(201).json({
        usuario: {
          id: novoUsuario.id,
          nome: novoUsuario.nome,
          email: novoUsuario.email,
        },
        token: token,
      });
    } catch (error) {
      logger.error("Erro no cadastro:", error);
      logger.log("🔥 error.response:", error.response);
      logger.log("🔥 error.response?.data:", error.response?.data);
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

      if (!usuario.verificado) {
        return res.status(403).json({ erro: "Conta não verificada" });
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
  
  async confirmar(req, res) {
    try {
      const { token } = req.params;
      const dados = jwt.verify(token, process.env.JWT_SECRET);
      const usuario = await Usuario.findByPk(dados.id);
      if (!usuario) {
        return res.status(400).json({ erro: "Usuário inválido" });
      }
      usuario.verificado = true;
      await usuario.save();
      res.json({ mensagem: "Conta verificada com sucesso" });
    } catch (error) {
      res.status(400).json({ erro: "Token inválido" });
    }
  },
};

module.exports = usuarioController;

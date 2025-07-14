const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Usuario, UsuarioPendente } = require("../models");
const { Op } = require("sequelize");
const logger = require("../utils/logger");
const enviarEmail = require("../utils/mailer");
const gerarCodigoVerificacao = require("../utils/gerarCodigoVerificacao");

const usuarioController = {
  async cadastrar(req, res) {
    try {
      const { nome, email, senha } = req.body;

      const usuarioExistente = await Usuario.findOne({ where: { email } });
      if (usuarioExistente) {
        return res.status(400).json({ erro: "Email já cadastrado." });
      }

      const pendenteExistente = await UsuarioPendente.findOne({
        where: { email },
      });
      if (pendenteExistente) {
        return res
          .status(400)
          .json({ erro: "Já há um cadastro pendente para este email." });
      }

      // Limpa registros expirados
      await UsuarioPendente.destroy({
        where: { expires_at: { [Op.lt]: new Date() } },
      });

      const senha_hash = await bcrypt.hash(senha, 10);
      const codigo = gerarCodigoVerificacao();
      const expires_at = new Date(Date.now() + 60 * 60 * 1000); // 1h

      await UsuarioPendente.create({
        nome,
        email,
        senha_hash,
        codigo,
        expires_at,
      });

      try {
        await enviarEmail(
          email,
          "Código de verificação",
          `Seu código de verificação é: ${codigo}`
        );
      } catch (e) {
        logger.error("Erro ao enviar email de verificação:", e);
      }
      res.status(201).json({ mensagem: "Código enviado" });
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

  async confirmarCodigo(req, res) {
    try {
      const { email, codigo } = req.body;

      const pendente = await UsuarioPendente.findOne({
        where: { email, codigo },
      });
      if (!pendente || pendente.expires_at < new Date()) {
        return res.status(400).json({ erro: "Código inválido" });
      }

      const novoUsuario = await Usuario.create({
        nome: pendente.nome,
        email: pendente.email,
        senha_hash: pendente.senha_hash,
        verificado: true,
      });

      await pendente.destroy();

      const token = jwt.sign(
        {
          id: novoUsuario.id,
          nome: novoUsuario.nome,
          email: novoUsuario.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
      );

      res.json({
        usuario: {
          id: novoUsuario.id,
          nome: novoUsuario.nome,
          email: novoUsuario.email,
        },
        token,
      });
    } catch (error) {
      logger.error("Erro ao confirmar código:", error);
      res.status(500).json({ erro: "Erro ao confirmar código" });
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

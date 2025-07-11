const gerarCodigo = require("../utils/gerarCodigo");
const { Sala, Preferencia, Convidado, Usuario } = require("../models");
// const montarPrompt = require("../utils/montarPrompt"); retirar o gemini por hora
// const consultarGemini = require("../utils/consultarGemini");
// const buscarLugares = require("../utils/buscarLugares");
const obterLugares = require("../utils/obterLugares");
const logger = require("../utils/logger");
const nodemailer = require("nodemailer");



const criarSala = async (req, res) => {
  try {
    const hostId = req.usuario?.id;
    const nomeHost = req.usuario?.nome;
    const { localizacao } = req.body;

    if (!hostId) {
      return res.status(401).json({ erro: "Usuário não autenticado" });
    }

    if (!localizacao) {
      return res
        .status(400)
        .json({ erro: "Localização do host é obrigatória" });
    }

    const codigo = gerarCodigo();

    const sala = await Sala.create({
      nome: `Role do(a) ${nomeHost}`,
      host_id: hostId,
      codigo,
      localizacao_host: localizacao,
      total_convidados: 1,
      total_votos: 0,
    });

    const convidadoHost = await Convidado.create({
      nome: nomeHost,
      cod_ref: codigo,
      sala_id: sala.id,
      localizacao,
    });

    await Sala.increment("total_convidados", { by: 1, where: { id: sala.id } });

    return res
      .status(201)
      .json({ codigo, salaId: sala.id, convidadoId: convidadoHost.id });
  } catch (error) {
    logger.error(error);
    res
      .status(500)
      .json({ erro: "Erro ao criar sala", detalhe: error.message });
  }
};

const criarRole = async (req, res) => {
  try {
    const hostId = req.usuario?.id;
    const nomeHost = req.usuario?.nome;

    if (!hostId) {
      return res.status(401).json({ erro: "Usuário não autenticado" });
    }

    const {
      nome_role,
      tipo_role,
      palavras_chave,
      distancia,
      preco,
      avaliacao_minima,
      localizacao,
    } = req.body;

    const codigo = gerarCodigo();

    const preferencia = await Preferencia.create({
      nome_role,
      tipo_role,
      palavras_chave,
      distancia,
      preco,
      avaliacao_minima,
    });

    const sala = await Sala.create({
      nome: nome_role || `Rolê de ${nomeHost}`,
      host_id: hostId,
      codigo,
      pref_id: preferencia.id,
      total_convidados: 1,
      total_votos: 0,
      localizacao_host: localizacao,
    });

    const convidadoHost = await Convidado.create({
      nome: nomeHost,
      cod_ref: codigo,
      sala_id: sala.id,
      localizacao,
    });

    await Sala.increment("total_convidados", { by: 1, where: { id: sala.id } });

    return res.status(201).json({
      mensagem: "Rolê criado com sucesso!",
      codigo,
      salaId: sala.id,
      nomeSala: sala.nome,
      preferencia,
      convidadoId: convidadoHost.id,
    });
  } catch (error) {
    logger.error(error);
    return res
      .status(500)
      .json({ erro: "Erro ao criar rolê", detalhe: error.message });
  }
};

function calcularCentroGeografico(coordenadas) {
  const total = coordenadas.length;
  const soma = coordenadas.reduce(
    (acc, loc) => {
      acc.lat += loc.latitude;
      acc.lon += loc.longitude;
      return acc;
    },
    { lat: 0, lon: 0 }
  );

  return {
    latitude: soma.lat / total,
    longitude: soma.lon / total,
  };
}

const gerarSugestao = async (req, res) => {
  try {
    const { salaId } = req.body;
    const sala = await Sala.findByPk(salaId, {
      include: [{ model: Preferencia, as: "preferencia" }],
    });

    if (!sala) return res.status(404).json({ erro: "Sala não encontrada" });

    const convidados = await Convidado.findAll({ where: { sala_id: sala.id } });
    const todasLocalizacoes = [];

    if (sala.localizacao_host) {
      const [lat, lon] = sala.localizacao_host.split(",");
      todasLocalizacoes.push({
        latitude: parseFloat(lat),
        longitude: parseFloat(lon),
      });
    }

    convidados.forEach((c) => {
      if (c.localizacao) {
        const [lat, lon] = c.localizacao.split(",");
        todasLocalizacoes.push({
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
        });
      }
    });

    if (todasLocalizacoes.length === 0) {
      return res.status(400).json({ erro: "Nenhuma localização encontrada" });
    }

    const pontoMedio = calcularCentroGeografico(todasLocalizacoes);
    const preferencias = sala.preferencia;

    // const promptFinal = montarPrompt({ pontoMedio, preferencias });
    // const sugestao = await buscarLugares(preferencias, pontoMedio);
    const sugestao = await obterLugares(preferencias, pontoMedio);

    return res.status(200).json({
      pontoMedio,
      preferencias,
      sugestao,
    });
  } catch (error) {
    logger.error("❌ Erro interno ao gerar sugestão:", error);
    return res
      .status(500)
      .json({ erro: "Erro ao gerar sugestões", detalhe: error.message });
  }
};

const entrarComoConvidado = async (req, res) => {
  try {
    const { nome, codigo, localizacao } = req.body;

    if (!nome || !codigo) {
      return res
        .status(400)
        .json({ erro: "Nome e código da sala são obrigatórios" });
    }

    const sala = await Sala.findOne({ where: { codigo } });

    if (!sala) {
      return res.status(404).json({ erro: "Sala não encontrada" });
    }

    const convidado = await Convidado.create({
      nome,
      cod_ref: codigo,
      sala_id: sala.id,
      localizacao,
    });

    await Sala.increment("total_convidados", { by: 1, where: { id: sala.id } });

    res.status(201).json({
      mensagem: `${convidado.nome} entrou na sala`,
      convidadoId: convidado.id,
      salaId: sala.id,
      nomeSala: sala.nome,
    });
  } catch (error) {
    logger.error(error);
    res
      .status(500)
      .json({ erro: "Erro ao tentar entrar na sala", detalhe: error.message });
  }
};

const votar = async (req, res) => {
  try {
    const { convidadoId, voto } = req.body;

    if (!convidadoId || !voto) {
      return res
        .status(400)
        .json({ erro: "convidadoId e voto são obrigatórios" });
    }

    const convidado = await Convidado.findByPk(convidadoId);
    if (!convidado) {
      return res.status(404).json({ erro: "Convidado não encontrado" });
    }

    convidado.voto = voto;
    await convidado.save();

    await Sala.increment("total_votos", {
      by: 1,
      where: { id: convidado.sala_id },
    });

    const io = req.app.get("io");
    if (io) {
      io.to(convidado.cod_ref).emit("novo_voto", {
        id: convidado.id,
        nome: convidado.nome,
        voto,
      });
    }

    res.status(200).json({ mensagem: "Voto registrado" });
  } catch (error) {
    logger.error(error);
    res
      .status(500)
      .json({ erro: "Erro ao registrar voto", detalhe: error.message });
  }
};

const listarVotos = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ erro: "ID da sala não informado" });
    }

    const votos = await Convidado.findAll({
      where: { sala_id: id },
      attributes: ["nome", "voto"],
    });

    return res.status(200).json(votos);
  } catch (error) {
    logger.error(error);
    res
      .status(500)
      .json({ erro: "Erro ao listar votos", detalhe: error.message });
  }
};

const enviarEmail = async (req, res) => {
  try {
    const { email, placeName, mapsLink, date, time } = req.body;
    if (!email || !placeName || !mapsLink || !date || !time) {
      return res.status(400).json({ erro: "Dados incompletos" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Convite para ${placeName}`,
      text: `Convite para ${placeName} em ${date} às ${time}. Veja no mapa: ${mapsLink}`,
    });

    res.status(200).json({ mensagem: "Email enviado" });
  } catch (error) {
    logger.error(error);
    res
      .status(500)
      .json({ erro: "Erro ao enviar email", detalhe: error.message });
  }
};

module.exports = {
  criarSala,
  criarRole,
  gerarSugestao,
  entrarComoConvidado,
  votar,
  listarVotos,
  enviarEmail,
};

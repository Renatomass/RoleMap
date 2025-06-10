const gerarCodigo = require("../utils/gerarCodigo");
const { Sala, Preferencia, Convidado, Usuario } = require("../models");
const montarPrompt = require("../utils/montarPrompt");
const consultarGemini = require("../utils/consultarGemini");

const criarSala = async (req, res) => {
  try {
    const hostId = req.usuario?.id;
    const nomeHost = req.usuario?.nome;
    const { localizacao } = req.body;

    if (!hostId) {
      return res.status(401).json({ erro: "Usuário não autenticado" });
    }

    if (!localizacao) {
      return res.status(400).json({ erro: "Localização do host é obrigatória" });
    }

    const codigo = gerarCodigo();

    const sala = await Sala.create({
      nome: `Role do(a) ${nomeHost}`,
      host_id: hostId,
      codigo,
      localizacao_host: localizacao,
      total_convidados: 0,
      total_votos: 0,
    });

    res.status(201).json({ codigo, salaId: sala.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao criar sala", detalhe: error.message });
  }
};

const criarRole = async (req, res) => {
  try {
    const hostId = req.usuario?.id;
    const nomeHost = req.usuario?.nome;

    if (!hostId) {
      return res.status(401).json({ erro: "Usuário não autenticado" });
    }

    const { nome_role, tipo_role, palavras_chave, distancia, preco, avaliacao_minima } = req.body;


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
      nome:nome_role || `Rolê de ${nomeHost}`,
      host_id: hostId,
      codigo,
      pref_id: preferencia.id,
      total_convidados: 0,
      total_votos: 0,
    });

    return res.status(201).json({
      mensagem: "Rolê criado com sucesso!",
      codigo,
      salaId: sala.id,
      nomeSala: sala.nome,
      preferencia,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro ao criar rolê", detalhe: error.message });
  }
};

function calcularCentroGeografico(coordenadas) {
  const total = coordenadas.length;
  const soma = coordenadas.reduce((acc, loc) => {
    acc.lat += loc.latitude;
    acc.lon += loc.longitude;
    return acc;
  }, { lat: 0, lon: 0 });

  return {
    latitude: soma.lat / total,
    longitude: soma.lon / total
  };
}

const gerarSugestao = async (req, res) => {
  try {
    const { salaId } = req.body;

    const sala = await Sala.findByPk(salaId, {
      include: [{ model: Preferencia, as: "preferencia" }]
    });

    if (!sala) return res.status(404).json({ erro: "Sala não encontrada" });

    const host = await Usuario.findByPk(sala.host_id);
    const convidados = await Convidado.findAll({ where: { sala_id: sala.id } });

    const todasLocalizacoes = [];

    if (host.localizacao) {
      const [lat, lon] = host.localizacao.split(",");
      todasLocalizacoes.push({ latitude: parseFloat(lat), longitude: parseFloat(lon) });
    }

    convidados.forEach(c => {
      if (c.localizacao) {
        const [lat, lon] = c.localizacao.split(",");
        todasLocalizacoes.push({ latitude: parseFloat(lat), longitude: parseFloat(lon) });
      }
    });

    if (todasLocalizacoes.length === 0) {
      return res.status(400).json({ erro: "Nenhuma localização encontrada" });
    }

    const pontoMedio = calcularCentroGeografico(todasLocalizacoes);
    const preferencias = sala.preferencia;

    const prompt = montarPrompt({ pontoMedio, preferencias });

    const respostaGemini = await consultarGemini(prompt);

    return res.status(200).json({
      pontoMedio,
      preferencias,
      sugestao: respostaGemini
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro ao gerar sugestões", detalhe: error.message });
  }
};


const entrarComoConvidado = async (req, res) => {
  try {
    const {nome, codigo, localizacao} = req.body;

    if (!nome || !codigo){
      return res.status(400).json({ erro: 'Nome e código da sala são obrigatórios'});
      }

      const sala = await Sala.findOne ({ where: {codigo}});

      if (!sala){
        return res.status(404).json ({ erro: ' Sala não encontrada '})
      }

      const convidado = await Convidado.create({
        nome,
        codigo_ref: codigo,
        sala_id: sala.id,
        localizacao: req.body.localizacao
       });

       res.status(201).json({
        mensagem: `${convidado.nome} entrou na sala `,
        convidadoId: convidado.id,
        salaId: sala.id,
        nomeSala: sala.nome
       });

  } catch (error) {
    console.error(error);
      res.status(500).json({erro: 'Erro ao tentar entra na sala', detalhe: error.message});
  }
};

module.exports = {
  criarSala,
  criarRole,
  gerarSugestao,
  entrarComoConvidado,
  gerarSugestao
}

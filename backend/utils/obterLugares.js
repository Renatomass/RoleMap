const { Lugar } = require('../models');
const buscarLugares = require('./buscarLugares');

async function obterLugares(preferencias, pontoMedio) {
  const localizacao = `${pontoMedio.latitude},${pontoMedio.longitude}`;

  // 1) Busca lugar na API
  const resultado = await buscarLugares(preferencias, pontoMedio);
  if (!resultado) return null;

  // 2) Verifica se já existe no banco pelo nome real e localização
  const encontrado = await Lugar.findOne({
    where: {
      nome: resultado.nome,
      localizacao,
    },
  });

  if (encontrado) return encontrado;

  // 3) Se não existir, salva
  const novoLugar = await Lugar.create({
    nome: resultado.nome,
    preco: resultado.preco,
    imagem: resultado.imagem,
    distancia: resultado.distancia,
    nota: resultado.nota,
    localizacao,
  });

  return novoLugar;
}

module.exports = obterLugares;

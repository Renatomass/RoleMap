const { Lugar } = require('../models');
const buscarLugares = require('./buscarLugares');

async function obterLugares(preferencias, pontoMedio) {
  const localizacao = `${pontoMedio.latitude},${pontoMedio.longitude}`;

  const resultado = await buscarLugares(preferencias, pontoMedio);
  if (!resultado) return null;

  const encontrado = await Lugar.findOne({
    where: {
      nome: resultado.nome,
      localizacao,
    },
  });

  if (encontrado) return encontrado;

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

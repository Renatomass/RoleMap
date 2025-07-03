const { Lugar } = require('../models');
const buscarLugares = require('./buscarLugares');

async function obterLugares(preferencias, pontoMedio) {
  const { palavras_chave } = preferencias;
  const localizacao = `${pontoMedio.latitude},${pontoMedio.longitude}`;

  // 1) Verifica se já existe um lugar salvo com mesmo nome e localização
  const encontrado = await Lugar.findOne({ where: { nome: palavras_chave, localizacao } });
  if (encontrado) return encontrado;

  // 2) Se não houver, consulta a API do Google
  const resultado = await buscarLugares(preferencias, pontoMedio);
  if (resultado) {
    // 3) Salva no banco para reutilização futura
    await Lugar.create({
      nome: resultado.nome,
      preco: resultado.preco,
      imagem: resultado.imagem,
      distancia: resultado.distancia,
      nota: resultado.nota,
      localizacao
    });
  }

  return resultado;
}

module.exports = obterLugares;

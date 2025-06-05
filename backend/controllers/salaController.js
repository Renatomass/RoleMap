const gerarCodigo = require('../utils/gerarCodigo');

const criarSala = (req, res) => {
  const codigo = gerarCodigo();
  console.log(`🎉 Sala criada com código: ${codigo}`);
  res.json({ codigo });
};

module.exports = { criarSala };

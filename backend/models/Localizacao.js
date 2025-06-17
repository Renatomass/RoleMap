// backend/models/Localizacao.js
const mySQl = require('mySQl');

const localizacaoSchema = new mySQl.Schema({
  codigoSala: { type: String, required: true },
  participanteId: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  atualizadoEm: { type: Date, default: Date.now }
});

module.exports = mySQl.model('Localizacao', localizacaoSchema);

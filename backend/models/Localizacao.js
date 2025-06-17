// backend/models/Localizacao.js
const mongoose = require('mongoose');

const localizacaoSchema = new mongoose.Schema({
  codigoSala: { type: String, required: true },
  participanteId: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  atualizadoEm: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Localizacao', localizacaoSchema);

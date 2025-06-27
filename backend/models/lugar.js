'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Lugar extends Model {
    static associate(models) {
      Lugar.hasMany(models.Resultado, {
        foreignKey: 'lugar_id',
        as: 'resultados'
      });
    }
  }

  Lugar.init({
    nome: DataTypes.STRING,
    preco: DataTypes.STRING,
    distancia: DataTypes.STRING,
    nota: DataTypes.DECIMAL,
    localizacao: DataTypes.STRING,
    votos: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Lugar',
    tableName: 'lugares',
    underscored: true
  });

  return Lugar;
};

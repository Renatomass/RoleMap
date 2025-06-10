'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Resultado extends Model {
    static associate(models) {
      Resultado.belongsTo(models.Sala, {
        foreignKey: 'sala_id',
        as: 'sala'
      });

      Resultado.belongsTo(models.Lugar, {
        foreignKey: 'lugar_id',
        as: 'lugar'
      });
    }
  }

  Resultado.init({
    sala_id: DataTypes.INTEGER,
    lugar_id: DataTypes.INTEGER,
    nome: DataTypes.STRING,
    preco: DataTypes.STRING,
    distancia: DataTypes.STRING,
    nota: DataTypes.DECIMAL,
    localizacao: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Resultado',
    tableName: 'resultados',
    underscored: true
  });

  return Resultado;
};

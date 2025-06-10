'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Preferencia extends Model {
    static associate(models) {
      Preferencia.belongsTo(models.Convidado, {
        foreignKey: 'convidado_id',
        as: 'convidado'
      });
    }
  }

  Preferencia.init({
    tipo_role: DataTypes.STRING,
    palavras_chave: DataTypes.STRING,
    distancia: DataTypes.STRING,
    avaliacao_minima: DataTypes.STRING,
    preco: DataTypes.STRING,
    codigo_gerado: DataTypes.STRING,
    convidado_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Preferencia',
    tableName: 'preferencias',
    underscored: true,
    timestamps: false
  });

  return Preferencia;
};

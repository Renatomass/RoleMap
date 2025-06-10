'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Convidado extends Model {
    static associate(models) {
      Convidado.belongsTo(models.Sala, {
        foreignKey: 'sala_id',
        as: 'sala'
      });

      Convidado.hasOne(models.Preferencia, {
        foreignKey: 'convidado_id',
        as: 'preferencia'
      });
    }
  }

  Convidado.init({
    nome: DataTypes.STRING,
    cod_ref: DataTypes.STRING,
    voto: DataTypes.STRING,
    localizacao: DataTypes.STRING,
    sala_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Convidado',
    tableName: 'convidados',
    underscored: false,
    timestamps: false
  });

  return Convidado;
};

'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Sala extends Model {
    static associate(models) {
      Sala.belongsTo(models.Usuario, {
        foreignKey: 'host_id',
        as: 'host'
      });

      Sala.hasMany(models.Convidado, {
        foreignKey: 'sala_id',
        as: 'convidados'
      });

      Sala.belongsTo(models.Preferencia, {
        foreignKey: 'pref_id',
        as: 'preferencia'
      });

      Sala.belongsTo(models.Resultado, {
        foreignKey: 'resultado_id',
        as: 'resultado'
      });
    }
  }

  Sala.init({
    nome: DataTypes.STRING,
    host_id: DataTypes.INTEGER,
    ponto_medio: DataTypes.STRING,
    pref_id: DataTypes.INTEGER,
    codigo: DataTypes.STRING,
    localizacao_host: DataTypes.STRING,
    total_convidados: DataTypes.INTEGER,
    total_votos: DataTypes.INTEGER,
    resultado_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Sala',
    tableName: 'salas',
    underscored: true
  });

  return Sala;
};

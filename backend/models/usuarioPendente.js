'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UsuarioPendente extends Model {
    static associate(_models) {}
  }

  UsuarioPendente.init(
    {
      nome: DataTypes.STRING,
      email: DataTypes.STRING,
      senha_hash: DataTypes.STRING,
      codigo: DataTypes.STRING,
      expires_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'UsuarioPendente',
      tableName: 'usuarios_pendentes',
      underscored: true,
      timestamps: false,
    }
  );

  return UsuarioPendente;
};
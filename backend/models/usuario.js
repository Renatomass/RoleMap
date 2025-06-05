'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Usuario.init({
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
    emailVerificado: DataTypes.BOOLEAN,
    codigoVerificacao: DataTypes.STRING,
    codigoExpiracao: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Participante extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Participante.init({
    usuarioId: DataTypes.INTEGER,
    salaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Participante',
  });
  return Participante;
};
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Preferencias', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tipo_role: {
        type: Sequelize.STRING
      },
      palavras_chave: {
        type: Sequelize.STRING
      },
      distancia: {
        type: Sequelize.STRING
      },
      avaliacao_minima: {
        type: Sequelize.STRING
      },
      preco: {
        type: Sequelize.STRING
      },
      codigo_gerado: {
        type: Sequelize.STRING
      },
      convidado_id: {
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Preferencias');
  }
};
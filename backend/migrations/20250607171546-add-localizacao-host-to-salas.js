'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('salas', 'localizacao_host', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

 async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('salas', 'localizacao_host');
  }
};

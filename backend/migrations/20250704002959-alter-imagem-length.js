'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('lugares', 'imagem', {
      type: Sequelize.TEXT, // permite salvar URLs bem longas
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('lugares', 'imagem', {
      type: Sequelize.STRING(255),
      allowNull: true,
    });
  }
};

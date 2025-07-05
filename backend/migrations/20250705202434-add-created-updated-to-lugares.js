module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('lugares', 'created_at', {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });
    await queryInterface.addColumn('lugares', 'updated_at', {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('lugares', 'created_at');
    await queryInterface.removeColumn('lugares', 'updated_at');
  },
};

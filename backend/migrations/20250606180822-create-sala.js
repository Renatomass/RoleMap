'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('salas', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nome: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      host_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      ponto_medio: {
        type: Sequelize.STRING(255)
      },
      pref_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'preferencias',
          key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      },
      codigo: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      total_convidados: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      total_votos: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      resultado_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'resultados',
          key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('salas');
  }
};

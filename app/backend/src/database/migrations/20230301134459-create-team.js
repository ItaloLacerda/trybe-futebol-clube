'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Teams', {   
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      team_name: Sequelize.STRING
    });
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.dropTable('Teams');
  }
};

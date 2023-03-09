module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('matches', {   
        id: {
          primaryKey: true,
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
        },
        homeTeamId: {
          foreignKey: true,
          type: Sequelize.INTEGER,
          allowNull: false,
          field: 'home_team_id'
        },
        homeTeamGoals: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'home_team_goals'
          },
        awayTeamId: {
            foreignKey: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'away_team_id'
          },
        awayTeamGoals: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'away_team_goals'
          },
        inProgress: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            field: 'in_progress'
          },
      });
    },
  
    down: async (queryInterface, Sequelize) => {
       await queryInterface.dropTable('matches');
    }
  };
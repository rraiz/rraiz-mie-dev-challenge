const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');  // Import sequelize instance
const Game = require('./game');  // Import Game model

// Define Session model
const Session = sequelize.define('Session', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  gameId: {
    type: DataTypes.INTEGER,
    references: {
      model: Game,
      key: 'id',
    },
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY, // Stores only the date
    allowNull: false,
  },
});

// Establish relationship
Game.hasMany(Session, { foreignKey: 'gameId', onDelete: 'CASCADE' });
Session.belongsTo(Game, { foreignKey: 'gameId' });

module.exports = Session;

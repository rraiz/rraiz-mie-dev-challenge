// database/models/game.js
const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');  // Import sequelize instance

// Define Game model
const Game = sequelize.define('Game', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true

  },
  min_players: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  max_players: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  thumbnail: {
    type: DataTypes.STRING,
    allowNull: true
  },
  last_played: {
    type: DataTypes.STRING,
    allowNull: true
  },
  times_played: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
});

module.exports = Game;
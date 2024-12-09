// database/setupDatabase.js
const sequelize = require('./sequelize');  // Import the sequelize instance
const Game = require('./models/game');    // Import the Game model
const insertSampleData = require('./seeds/sampleData');  // Import the insertSampleData function to insert sample data
const { Sequelize } = require('sequelize');

const setupDatabase = async () => {
  try {
    await sequelize.authenticate();  // Check database connection
    console.log('Database connected successfully.');

    //drop
    await sequelize.drop();

    // Sync models with the database (creates tables if they don't exist)
    await sequelize.sync();
    console.log('Database schema and models successfully synced.');

    // Insert sample data automatically after syncing the database
    await insertSampleData(Game);  // Pass models as arguments
    
  } catch (error) {
    console.error('Error setting up the database:', error.message);
    process.exit(1);
  }
};

// Correctly export the setupDatabase function
module.exports = { setupDatabase, Game};

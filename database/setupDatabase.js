const sequelize = require('./sequelize'); // Import the sequelize instance
const Game = require('./models/game'); // Import the Game model
const Session = require('./models/session'); // Import the Session model
const insertSampleData = require('./seeds/sampleData'); // Import the insertSampleData function to insert sample data
const { Sequelize } = require('sequelize');

const MAX_RETRIES = 10; // Maximum number of retry attempts
const RETRY_INTERVAL = 1000; // Retry interval in milliseconds

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)); // Sleep function

const setupDatabase = async () => {
  let retries = 0;

  while (retries < MAX_RETRIES) {
    try {
      await sequelize.authenticate(); // Check database connection
      console.log('Database connected successfully.');

      // Drop existing tables
      await sequelize.drop();

      // Sync models with the database (creates tables if they don't exist)
      await sequelize.sync();
      console.log('Database schema and models successfully synced.');

      // Insert sample data automatically after syncing the database
      await insertSampleData(Game, Session); // Pass models as arguments
      
      return; // Exit the function successfully
    } catch (error) {
      retries++;
      console.error(
        `Error setting up the database (Attempt ${retries}/${MAX_RETRIES}):`,
        error.message
      );

      if (retries < MAX_RETRIES) {
        console.log(`Retrying in ${RETRY_INTERVAL / 1000} seconds...`);
        await sleep(RETRY_INTERVAL);
      } else {
        console.error('Max retries reached. Exiting...');
        process.exit(1); // Exit the process with failure
      }
    }
  }
};

// Correctly export the setupDatabase function
module.exports = { setupDatabase, Game, Session};

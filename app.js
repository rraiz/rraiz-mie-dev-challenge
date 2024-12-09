// app.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const { getHomePage } = require('./routes/index');
const game = require('./routes/game');

require('dotenv').config();
const { setupDatabase, Game } = require('./database/setupDatabase'); // Import database setup function

setupDatabase();  // Setup and sync the database

// Set global Sequelize models to be used in routes
global.db = { Game };

app.set('port', process.env.port);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', getHomePage);
app.get('/add-game', game.getAdd);
app.get('/edit-game/:id', game.getEdit);

app.post('/add-game', game.postAdd);
app.post('/edit-game/:id', game.postEdit);
app.post('/delete-game/:id', game.postDelete);
app.post('/play/:id', game.postPlay);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port: ${process.env.PORT}`);
});

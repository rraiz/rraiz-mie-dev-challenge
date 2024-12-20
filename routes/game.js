
module.exports = {
	getAdd: (req, res) => {
	  res.render('add-game.ejs', {
		title: 'Board Games | Add game'
	  });
	},
	
	// Get the game details for editing
	getEdit: async (req, res) => {
		const id = req.params.id;
		try {
		// Find the game by its ID
		const game = await global.db.Game.findByPk(id);
		if (!game) {
			return res.status(400).send('Game not found!');
		}

		// Render the edit form with the current game data
		res.render('edit-game', { game }); // Passing the game object to the view
		} catch (error) {
		res.status(400).send('Error retrieving game: ' + error.message);
		}
	},

	getSession: async (req, res) => {
		try {
		  const { id } = req.params; // Get game ID from the route parameter
	  
		  // Find the game by ID
		  const game = await global.db.Game.findOne({
			where: { id }, // Use the ID to find the game
		  });
	  
		  if (!game) {
			return res.status(404).send('Game not found');
		  }
	  
		  // Find all sessions for the game by game ID
		  const sessions = await global.db.Session.findAll({
			where: { gameId: game.id }, // Match sessions to the game ID
			attributes: ['date'], // Only fetch the date field
			order: [['date', 'DESC']], // Order by date descending
		  });
	  
		  // Render the sessions view
		  res.render('sessions', {
			game, // Pass game details
			sessions, // Pass associated sessions
		  });
		} catch (error) {
		  console.error('Error fetching sessions:', error.message);
		  res.status(500).send('An error occurred while fetching sessions');
		}
	  },	  
	  
  
	// Add a new game to the database
	postAdd: async (req, res) => {
		const { name, thumbnail, max_players, min_players, last_played, times_played } = req.body;
		try {
		  // Create a new game
		  const game = await global.db.Game.create({
			name,
			thumbnail,
			max_players,
			min_players,
			last_played,
			times_played,
		  });
	  
		  // Add a session if `last_played` is provided
		  if (last_played) {
			await global.db.Session.create({
			  gameId: game.id,
			  date: last_played,
			});
		  }
	  
		  // Redirect to the homepage with a success message
		  res.redirect('/?message=Game%20Added');
		} catch (error) {
		  res.status(400).send('Error adding game: ' + error.message);
		}
	  },
	  
  
  // Update the game with the submitted form data
  postEdit: async (req, res) => {
	const id = req.params.id;
	const { name, thumbnail, min_players, max_players, last_played, times_played } = req.body;
	try {
	  // Find the game by its ID
	  const game = await global.db.Game.findByPk(id);
	  if (!game) {
		return res.status(404).send('Game not found!');
	  }
  
	  // Update the game’s details
	  await game.update({
		name,
		thumbnail,
		min_players,
		max_players,
		last_played,
		times_played,
	  });
  
	  // If `last_played` is provided, update or add the session
	  if (last_played) {
		// Check if a session with the same date exists
		const existingSession = await global.db.Session.findOne({
		  where: { gameId: game.id, date: last_played },
		});
  
		if (!existingSession) {
		  // Add a new session if it doesn't exist
		  await global.db.Session.create({
			gameId: game.id,
			date: last_played,
		  });
		}
	  }
  
	  // Update `last_played` to the most recent session date
	  const mostRecentSession = await global.db.Session.findOne({
		where: { gameId: game.id },
		order: [['date', 'DESC']],
	  });
  
	  if (mostRecentSession) {
		await game.update({
		  last_played: mostRecentSession.date,
		});
	  }
  
	  // Redirect to the homepage with a success message
	  res.redirect('/?message=Game%20Updated');
	} catch (error) {
	  res.status(400).send('Error updating game: ' + error.message);
	}
  },
  
	
// Delete the game
postDelete: async (req, res) => {
	const id = req.params.id;
	try {
	  // Find the game by its ID
	  const game = await global.db.Game.findByPk(id);
	  if (!game) {
		return res.status(400).send('Game not found!');
	  }
  
	  const name = game.name; // Get the name of the game
  
	  // Delete the game from the database
	  await game.destroy();
  
	  // Redirect to the homepage with a success message
	  res.redirect(`/?message=Game%20${encodeURIComponent(name)}%20Deleted%20Successfully`);
	} catch (error) {
	  res.status(400).send('Error deleting game: ' + error.message);
	}
  },
  
	  
	// Handle the game "Play" button click, update the game and redirect
	postPlay: async (req, res) => {
		const id = req.params.id;
		try {
		  // Find the game by its ID
		  const game = await global.db.Game.findByPk(id);
		  if (!game) {
			return res.status(400).send('Game not found!');
		  }
	  
		  // Get the current date (no time)
		  const currentDate = new Date().toISOString().split('T')[0]; // yyyy-mm-dd format
	  
		  // Update the game’s last_played and increment times_played
		  await game.update({
			last_played: currentDate,
			times_played: game.times_played + 1,
		  });
	  
		  // Add a new session for the game
		  await global.db.Session.create({
			gameId: game.id, // Associate the session with the game
			date: currentDate, // Use the current date for the session
		  });
	  
		  // Redirect to homepage with success message
		  res.redirect('/?message=Game%20Updated');
		} catch (error) {
		  res.status(400).send('Error updating game: ' + error.message);
		}
	  }

  };
  
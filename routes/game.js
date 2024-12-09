// game.js
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
  
	// Add a new game to the database
	postAdd: async (req, res) => {
	  const { name, thumbnail, max_players, min_players, last_played, times_played } = req.body;
	  try {
		// Insert a new game into the Game model using Sequelize
		await global.db.Game.create({
		  name: name,
		  thumbnail: thumbnail,
		  max_players: max_players,
		  min_players: min_players,
		  last_played: last_played,
		  times_played: times_played
		});
  
		// If the game was successfully added, redirect to the homepage
		res.redirect('/');
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
        return res.status(400).send('Game not found!');
      }

      // Update the game’s details
      await game.update({
        name,
        thumbnail,
        min_players,
        max_players,
        last_played,
        times_played
      });

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
			times_played: game.times_played + 1
		});

		// Redirect to homepage with success message
		res.redirect('/?message=Game%20Updated');
		} catch (error) {
		res.status(400).send('Error updating game: ' + error.message);
		}
	}

  };
  
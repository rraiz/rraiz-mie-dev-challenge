// game.js
module.exports = {
	getAdd: (req, res) => {
	  res.render('add-game.ejs', {
		title: 'Board Games | Add game'
	  });
	},
	
	getEdit: (req, res) => {
	  res.render('edit-game.ejs', {
		title: 'Board Games | Edit game'
	  });
	},
  
	// Add a new game to the database
	postAdd: async (req, res) => {
	  const { name, thumbnail, max_players, min_players, last_played, times_plyaed } = req.body;
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
  
	// Edit an existing game in the database
	postEdit: async (req, res) => {
	  const id = req.params.id;
	  const { name, thumbnail, max_players, min_players, last_played, times_played } = req.body;
	  try {
		// Update the game with the given ID
		await global.db.Game.update(
		  {
			name: name,
			thumbnail: thumbnail,
			max_players: max_players,
			min_players: min_players,
			last_played: last_played,
			times_played: times_played
		  },
		  {
			where: { id: id }
		  }
		);
  
		// After updating, redirect to the homepage
		res.redirect('/');
	  } catch (error) {
		res.status(400).send('Error editing game: ' + error.message);
	  }
	},
	
	// delete a game from the database
	postDelete: async (req, res) => {
		const id = req.params.id;
		try {
		  // Check if the game exists
		  const game = await global.db.Game.findByPk(id);
		  if (!game) {
			return res.status(400).send('Game not found!');
		  }

	
		  // Delete the game if no sessions are present
		  await global.db.Game.destroy({ where: { id: id } });
		  
		  res.status(200).send('Game deleted successfully!');
		} catch (error) {
		  res.status(400).send('Error deleting game: ' + error.message);
		}
	  }
  };
  
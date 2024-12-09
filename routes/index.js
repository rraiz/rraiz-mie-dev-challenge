const express = require('express');
const router = express.Router();

module.exports = {
  getHomePage: async (req, res) => {
    try {
      // Get the sort option from query parameters (default to 'last_played_desc')
      const sortOption = req.query.sort || 'last_played_desc';
      let sortField = '';
      let sortOrder = 'DESC'; // Default to descending order

      // Determine the sort field and order based on the selected option
      if (sortOption === 'last_played_asc') {
        sortField = 'last_played';
        sortOrder = 'ASC';
      } else if (sortOption === 'last_played_desc') {
        sortField = 'last_played';
        sortOrder = 'DESC';
      } else if (sortOption === 'times_played_asc') {
        sortField = 'times_played';
        sortOrder = 'ASC';
      } else if (sortOption === 'times_played_desc') {
        sortField = 'times_played';
        sortOrder = 'DESC';
      }

      // Fetch games from the database with sorting applied
      const games = await global.db.Game.findAll({
        order: [[sortField, sortOrder]]
      });

      // Render the homepage with the sorted games
      res.render('index', {
        games: games,  // Pass the sorted games to the view
        sortOption: sortOption // Pass the sort option to the view
      });
    } catch (err) {
      // Log the error and redirect to the homepage in case of any issues
      console.error('Error fetching games:', err);
      res.redirect('/');
    }
  }
};

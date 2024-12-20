const insertSampleData = async (Game, Session) => {
  try {
    // Insert sample data for games with actual board game data
    const games = await Game.bulkCreate(
      [
        {
          name: 'Catan',
          thumbnail:
            'https://assets.nintendo.com/image/upload/q_auto/f_auto/ncom/software/switch/70010000068417/f75365bce6cbfbf0e1678f1ce87fe8631234b505149e22a93464120bd8f9b98a',
          max_players: 4,
          min_players: 3,
          last_played: '2024-12-09',
          times_played: 5,
        },
        {
          name: 'Ticket to Ride',
          thumbnail:
            'https://b1803394.smushcdn.com/1803394/wp-content/uploads/2019/09/a-love-letter-to-ticket-to-ride-header-300x168.jpg?lossy=1&strip=1&webp=1',
          max_players: 5,
          min_players: 2,
          last_played: '2024-12-08',
          times_played: 3,
        },
        {
          name: 'Pandemic',
          thumbnail:
            'https://therewillbe.games/media/reviews/photos/original/1f/3d/ef/pandemic-saturday-review-9-1579181025.jpg',
          max_players: 4,
          min_players: 2,
          last_played: '2024-12-07',
          times_played: 4,
        },
        {
          name: 'Carcassonne',
          thumbnail:
            'https://cdn1.epicgames.com/0aaf0617ee0d47df87c0dc93509159dd/offer/Videos%20Thumbnail-1920x1080.jpg-1920x1080-baaafe9bc40ed03a14e174bb99f2ce44-1920x1080-baaafe9bc40ed03a14e174bb99f2ce44.jpg',
          max_players: 5,
          min_players: 2,
          last_played: '2024-12-06',
          times_played: 2,
        },
        {
          name: 'Monopoly',
          thumbnail:
            'https://m.media-amazon.com/images/S/aplus-media-library-service-media/26b97649-5648-4880-9db9-143ff0ea87f7.__CR0,0,970,600_PT0_SX970_V1___.jpg',
          max_players: 8,
          min_players: 2,
          last_played: '2024-12-05',
          times_played: 1,
        },
        {
          name: 'Scrabble',
          thumbnail:
            'https://media.istockphoto.com/id/487051045/photo/scrabble-board-game.jpg?s=612x612&w=0&k=20&c=cob1XOSywaD9c7HyuXGWEIqcEnpyJoHTD5kILc4cwcQ=',
          max_players: 4,
          min_players: 2,
          last_played: '2024-12-04',
          times_played: 6,
        },
        {
          name: 'Clue',
          thumbnail:
            'https://miro.medium.com/v2/resize:fit:1400/0*H7GhM_QyjWW1ZB0d',
          max_players: 6,
          min_players: 3,
          last_played: '2024-12-03',
          times_played: 7,
        },
        {
          name: 'Chess',
          thumbnail:
            'https://images.unsplash.com/photo-1655246741674-5646da9c03c5?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hlc3MlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww',
          max_players: 2,
          min_players: 2,
          last_played: '2024-12-02',
          times_played: 8,
        },
      ],
      {
        ignoreDuplicates: true,
      }
    );

    console.log('Games inserted successfully.');

    // Insert sample data for sessions
    const sessions = [
      { gameId: games.find((g) => g.name === 'Catan').id, date: '2024-12-09' },
      { gameId: games.find((g) => g.name === 'Catan').id, date: '2024-12-01' },
      { gameId: games.find((g) => g.name === 'Ticket to Ride').id, date: '2024-12-08' },
      { gameId: games.find((g) => g.name === 'Ticket to Ride').id, date: '2024-12-02' },
      { gameId: games.find((g) => g.name === 'Pandemic').id, date: '2024-12-07' },
      { gameId: games.find((g) => g.name === 'Pandemic').id, date: '2024-12-03' },
      { gameId: games.find((g) => g.name === 'Carcassonne').id, date: '2024-12-06' },
      { gameId: games.find((g) => g.name === 'Monopoly').id, date: '2024-12-05' },
      { gameId: games.find((g) => g.name === 'Scrabble').id, date: '2024-12-04' },
      { gameId: games.find((g) => g.name === 'Clue').id, date: '2024-12-03' },
      { gameId: games.find((g) => g.name === 'Chess').id, date: '2024-12-02' },
    ];

    await Session.bulkCreate(sessions, { ignoreDuplicates: true });

    console.log('Sessions inserted successfully.');
  } catch (error) {
    console.error('Error inserting sample data:', error.message);
  }
};

module.exports = insertSampleData;

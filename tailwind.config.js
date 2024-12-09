module.exports = {
  content: [
    './views/**/*.ejs',  // Include all EJS files in the 'views' folder
    './routes/**/*.js',  // Include JS files in the 'routes' folder (for dynamic class generation)
    './partials/**/*.ejs' // Include EJS files in the 'partials' folder if needed
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

const express = require('express');
const movieRoutes = express.Router();
const authHelpers = require('../services/auth/auth-helpers');

const moviesController = require('../controllers/movies-controller');


movieRoutes.get('/', moviesController.index);
movieRoutes.post('/', authHelpers.loginRequired, moviesController.create);

movieRoutes.get('/add', authHelpers.loginRequired, (req, res) => {
  res.render('movies/movie-add', {
    currentPage: 'add',
  });
});

movieRoutes.get('/:id', moviesController.show);
movieRoutes.get('/:id/edit', authHelpers.loginRequired, moviesController.edit);
movieRoutes.put('/:id', authHelpers.loginRequired, moviesController.update);
movieRoutes.delete('/:id', authHelpers.loginRequired, moviesController.delete);

module.exports = movieRoutes;
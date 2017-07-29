const Movie = require('../models/movie');

const movieController = {};

movieController.index = (req, res) => {
  Movie.findAll()
    .then(movies => {
      res.render('movies/movie-index', {
        currentPage: 'index',
        message: 'ok',
        data: movies,
      });
    }).catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
};

movieController.show = (req, res) => {
  Movie.findById(req.params.id)
    .then(movie => {
      res.render('movies/movie-single', {
        currentPage: 'show',
        message: 'ok',
        data: movie,
      });
    }).catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

movieController.create = (req, res) => {
  Movie.create({
    title: req.body.title,
    year: req.body.year,
    genre: req.body.genre,
  }, req.user.id).then(() => {
    res.redirect('/movies');
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
};

movieController.update = (req, res) => {
  Movie.update({
    title: req.body.title,
    year: req.body.year,
    genre: req.body.genre,
  }, req.params.id).then(movie => {
    res.redirect(`/movies/${req.params.id}`);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
};

movieController.edit = (req, res) => {
  Movie.findById(req.params.id)
    .then(movie => {
      res.render('movies/movie-single-edit', {
        currentPage: 'edit',
        data: movie,
      });
    }).catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

movieController.delete = (req, res) => {
  Movie.destroy(req.params.id)
    .then(() => {
      res.redirect('/movies');
    }).catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

module.exports = movieController;
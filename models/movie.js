const db = require('../db/config');

const Movie = {};

Movie.findAll = () => {
  return db.query('SELECT * FROM movies');
}

Movie.findById = (id) => {
  return db.oneOrNone(`
    SELECT * FROM movies
    WHERE id = $1
  `, [id]);
}

Movie.create = (movie, userid) => {
  return db.one(`
    INSERT INTO movies
    (title, year, genre, user_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `, [movie.title, movie.year, movie.genre, userid]);
}

Movie.update = (movie, id) => {
  return db.one(`
    UPDATE movies SET
    title = $1,
    year = $2,
    genre = $3
    WHERE id = $4
    RETURNING *
  `, [movie.title, movie.year, movie.genre, id]);
}

Movie.destroy = (id) => {
  return db.none(`
    DELETE FROM movies
    WHERE id = $1
  `, [id]);
}

module.exports = Movie;
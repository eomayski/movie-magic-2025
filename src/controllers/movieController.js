import { Router } from "express";
import movieService from "../services/movieService.js";
import castService from "../services/castService.js";

const movieController = Router();

movieController.get('/create', (req, res) => {
    res.render('create', {pageTitle: "Create Movie"}) 
})  

movieController.post('/create', async (req, res) => {
    const movieData = req.body;

    await movieService.create(movieData)
    
    
    res.redirect('/');
})

movieController.get('/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId);
    const ratingView = "&#x2605;".repeat(Math.trunc(movie.rating))

    res.render('details', {movie, pageTitle: movie.title, rating: ratingView});
    
})

movieController.get('/:movieId/attach', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId);
    const casts = await castService.getAll({excludes: movie.casts});

    res.render('casts/attach', {movie, casts, pageTitle: "Attach New Cast"});
    
})

movieController.post('/:movieId/attach', async (req, res) => {
  const movieId = req.params.movieId;
  const castId = req.body.cast

  await movieService.attach(movieId, castId);

  res.redirect(`/movies/${movieId}/details`)
} )

movieController.get('/search', async (req, res) => {
    const filter = req.query;

    const movies = await movieService.getAll(filter);

    res.render('search', {movies, filter, pageTitle: "Search Movies"})

})

export default movieController;
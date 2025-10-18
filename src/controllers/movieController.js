import { Router } from "express";
import movieService from "../services/movieService.js";
import castService from "../services/castService.js";
import { isAuth } from "../middleware/authMiddleware.js";

const movieController = Router();

movieController.get('/create', isAuth, (req, res) => {

    res.render('movies/create', { pageTitle: "Create Movie" })
})

movieController.post('/create', isAuth, async (req, res) => {
    const movieData = req.body;
    const userId = req.user.id;

    await movieService.create(movieData, userId)

    res.redirect('/');
})

movieController.get('/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId);
    const ratingView = "&#x2605;".repeat(Math.trunc(movie.rating))
    //const isCreator = req.user?.id && movie.creator == req.user.id 
    const isCreator = movie.creator && movie.creator.equals(req.user?.id)

    res.render('movies/details', { movie, pageTitle: movie.title, rating: ratingView, isCreator });

})

movieController.get('/:movieId/attach', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId);
    const casts = await castService.getAll({ excludes: movie.casts });

    res.render('casts/attach', { movie, casts, pageTitle: "Attach New Cast" });

})

movieController.post('/:movieId/attach', async (req, res) => {
    const movieId = req.params.movieId;
    const castId = req.body.cast

    await movieService.attach(movieId, castId);

    res.redirect(`/movies/${movieId}/details`)
})

movieController.get('/search', async (req, res) => {
    const filter = req.query;

    const movies = await movieService.getAll(filter);

    res.render('search', { movies, filter, pageTitle: "Search Movies" })

})

movieController.get('/:movieId/delete', isAuth, async (req, res) => {
  const movieId = req.params.movieId;

  const movie = await movieService.getOne(movieId);

  if (!movie.creator?.equals(req.user.id)) {
    return res.redirect('/')
  }

  await movieService.delete(movieId)
  res.redirect('/')

})

export default movieController;
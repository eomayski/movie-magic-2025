import Movie from "../models/Movie.js";



export default {
    getAll(filter = {}) {
        let query = Movie.find()

        if (filter.title) {
            // query = query.filter(movie => movie.title.toLowerCase().includes(filter.title.toLowerCase()))
            query = query.find({title: {$regex: filter.title, $options: 'i'}});
        }

        if (filter.genre) {
            // query = query.filter(movie => movie.genre.toLowerCase() === filter.genre.toLowerCase())
            query = query.find({genre: {$regex: new RegExp(`^${filter.genre}$`), $options: 'i'}});

        }

        if (filter.year) {
            // query = query.filter(movie => movie.year === filter.year)
            query = query.where('year').equals(filter.year);
        }

        return query;
    },
    getOne(movieId) {
        //return Movie.findOne({_id: movieId});
        return Movie.findById(movieId)
    },
    create(movieData) {
        movieData.rating = Number(movieData.rating)

        // const movie =  new Movie(movieData);
        // return movie.save();

        return Movie.create(movieData);
    },
    async attach(movieId, castId) {
        const movie = await Movie.findById(movieId);
        movie.casts.push(castId);
        return movie.save();
    }
}
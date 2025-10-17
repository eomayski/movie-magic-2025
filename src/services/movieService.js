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
        return Movie.findById(movieId).populate('casts')
    },
    create(movieData, userId) {
        
        // const movie =  new Movie(movieData);
        // return movie.save();
        
        return Movie.create({
            ...movieData,
            rating: Number(movieData.rating),
            creator: userId
            });
    },
    async attach(movieId, castId) {
        //Variant to push castId #1
        // const movie = await Movie.findById(movieId);
        // movie.casts.push(castId);
        // return movie.save();

        //Variant to push castId #2 (MongoDB style)
        return Movie.findByIdAndUpdate(movieId, {$push: {casts: castId}});
    }
}
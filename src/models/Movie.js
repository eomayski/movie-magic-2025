import { Schema, Types, model } from "mongoose";

const movieSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Movie title is required!'],
        minLength: [5, 'Title is too short!'],
        match: [/^[a-zA-Z0-9 ]+$/, 'Title has some invalid characters']
    },
    category: {
        type: String,
        enum: {
            values: ["tv-show", "animation", "movie", "documentary", "short-film"],
            message: 'Your category is invalid!'
        },
        required: [true, 'Movie category is required!']
    },
    genre: {
        type: String,
        required: [true, 'Movie genre is required!'],
        minLength: [5, 'Title is too short!'],
        match: [/^[a-zA-Z0-9 ]+$/, 'Genre has some invalid characters']
    },
    director: {
        type: String,
        required: [true, 'Movie director is required!'],
        minLength: [5, 'Title is too short!'],
        match: [/^[a-zA-Z0-9 ]+$/, 'director has some invalid characters']
    },
    year: {
        type: Number,
        min: [1900, 'Year can not be before 1900'],
        max: [2024, 'Year can not be after 2024']
    },
    imageUrl: {
        type: String,
        match: [/^https?:\/\//]
    },
    rating: {
        type: Number,
        min: [1, 'Minimal rating is 1'],
        max: [10, 'Maximal rating is 10']
    },
    description: {
        type: String,
        minLength: [20, 'Description must be at least 20 characters long.']
    },
    casts: [{
        type: Types.ObjectId,
        ref: 'Cast'
    }],
    creator: {
        type: Types.ObjectId,
        ref: 'User'
    }
})

const Movie = model('Movie', movieSchema)

export default Movie
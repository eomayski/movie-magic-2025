import { Schema, model } from "mongoose";

const castSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Cast name is required'],
        minLength: [5, 'Name is too short!'],
        match: [/^[a-zA-Z0-9 ]+$/, 'Cast name has some invalid characters']},
    age: {
        type: Number,
        required: [true, 'Cast age is required'],
        max: [120, 'Age can not be more than 120'],
        min: [1, 'Cast must be at least 1 year old']
    },
    born: {
        type: String,
        required: true,
        minLength: [5, 'Name is too short!'],
        match: [/^[a-zA-Z0-9 ]+$/, 'Cast name has some invalid characters']
    },
    imageUrl: {
        type: String,
        required: true}
});

const Cast = model('Cast', castSchema);

export default Cast;


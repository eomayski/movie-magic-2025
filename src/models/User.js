import { Schema, model } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email field is required'] 
    },
    password: {
        type: String,
        required: [true, 'Password field is required'] 
    }
})

const User = model('User', userSchema);

export default User
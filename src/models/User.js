import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

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

//Hash password
userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 13);
})

const User = model('User', userSchema);

export default User;
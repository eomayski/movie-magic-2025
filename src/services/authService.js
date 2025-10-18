import User from "../models/User.js";
import bcrypt from 'bcrypt';
import { generateAuthToken } from "../utils/tokenUtils.js";

export default {
    async register(email, password, rePass) {

        if (password !== rePass) {
            throw new Error("Passwords do not match");
        }

        const user = User.create({email, password})

        const token = generateAuthToken(user);

        return token;
    },
 async login(email, password) {
        const user = await User.findOne({email})

        if (!user) {
            throw new Error('Invalid user or password!');
        }

        const isValid = await bcrypt.compare(password, user.password);
        
        if (!isValid) {
            throw new Error('Invalid user or password!');
        }
        // Generate token
        const token = generateAuthToken(user);

        return token;
    }
}
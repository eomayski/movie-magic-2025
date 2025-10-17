import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/constants.js';

export default function authMiddleware(req, res, next) {
    const token = req.cookies['auth'];
    
    //Guest User
    if (!token) {
        console.log("Auth Middleware");
        
        return next();
    }

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);
        
        //Attach user to request
        req.user = decodedToken;
        req.isAuthenticated = true;
        
        //Valid User
        return next();
        
    } catch (error) {
        //Invalid User
        res.clearCookie('auth');
        res.redirect('/auth/login');
    }
}
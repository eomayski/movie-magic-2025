import express, { request, urlencoded } from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';


import routes from './routes.js';
import cookieParser from 'cookie-parser';
import authMiddleware from './middleware/authMiddleware.js';

const app = express();

//Setup Database
const url = 'mongodb://127.0.0.1:27017'

try {
    await mongoose.connect(url, {
        dbName: 'movie-magic-sept-2025'
    })
    
    console.log('Successfully connected to DB!');
    
} catch (error) {
    console.error('Can not connect to DB ', error.message);
    
}

//Setup Handlebars
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    runtimeOptions: {
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true
    }
}))
app.set('view engine', 'hbs');
app.set('views', 'src/views');

//Setup static middleware
app.use(express.static('src/public'));

//Parse form data from req
app.use(urlencoded());

//Cookie parser
app.use(cookieParser());
app.use(authMiddleware);

//Routes
app.use(routes);

//Start Server
app.listen(5000, () => console.log('Server is listening on http://localhost:5000...'));


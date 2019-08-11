const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRouter = require('./users/users.router');
const session = require('express-session');
const cors = require('cors');
const postRouter = require('./posts/posts.router');
const uploadRouter=require('./')

mongoose.connect('mongodb://localhost:27017/techkids-hotgirls', { useNewUrlParser: true }, (error) => {
    if (error) {
        throw error;
    } else {
        console.log('connect to mgDB success!')
        const app = express();

        //middleware
        app.use(bodyParser.json());

        // app.all('*', function(req, res, next) {
        //     res.header('Access-Control-Allow-Origin', '*');
        //     res.header('Access-Control-Allow-Credentials', true);
        //     res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        //     res.header('Access-Control-Allow-Headers', 'Content-Type');
        //     next();
        //   });

        app.use(cors({
            origin: 'http://localhost:3000',
            credentials: true,
        }))

        app.use(session({
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: true,
        }))
        app.use(express.static('public'))

        //router
        // /users/test
        app.use('/users', userRouter);
        app.use('/posts', postRouter);
        app.use(`/upload`,uploadRouter)

        // app.get('/', (req, res) => {
        //     res.sendFile(path.resolve(__dirname, './public/html/player.html'));
        // });

        app.listen(3001), (err) => {
            if (err) {
                throw err;
            }
            console.log('Server listen on port 3001...');
        };
    }
})

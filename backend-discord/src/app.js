const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cookieParser = require('cookie-parser')
const path = require('path');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const routes = require('./routes');
const ApiError = require("./utils/ApiError");
const httpStatus = require("http-status");
const {errorConverter, errorHandler} = require("./middlewares/error");
const cron = require('node-cron');
const Invite = require("./models/invite.model.js");

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.FRONT_IP);
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, Access-Control-Allow-Origin');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('access-control-expose-headers', 'Set-Cookie');
    next();
});

app.use(xss());
app.use(mongoSanitize());

app.use(express.json());
app.use(cookieParser());

app.use('/api', routes);
app.use('/public/images', express.static(path.join(__dirname, '../public/images')));

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

app.use(errorConverter);
app.use(errorHandler);


mongoose.connect(process.env.MONGO_DB,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        app.locals.db = mongoose.connection.db
        console.log('🥭 Connected to MongoDB')

        // Cron to delete expired invites
        // will run every day at 12:00 AM
        cron.schedule('0 0 0 * * *', async () => {
            await Invite.deleteMany({expiration: {$gte: 0, $lte: Date.now()}, neverExpires: false})
        })

    })
    .catch(() => console.log('Connection to MongoDB failed'));

module.exports = app

const express = require('express');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express()
require('dotenv').config({ path: './.env' });

app.use(cookieParser())
app.use(cors({
    origin: '*',
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '16kb' }));


// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000,
//     limit: 100,
//     standardHeaders: 'draft-8',
//     legacyHeaders: false,
//     message: 'You limit from this ip is expired. please try again later.'
// })
// app.use(limiter)


// All Routes 
const routes = require('./routes');
app.use(routes);

app.listen(3000, () => {
    console.log(`http://localhost:3000/`);
})
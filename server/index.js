const express = require('express');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express()
const path = require('path');
require('dotenv').config({ path: './.env' });

app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

app.use('/api/public', express.static(path.join(__dirname, 'public')));
app.get('/api/public/temp/:filename', (req, res) => {
  const filePath = path.join('//public//temp//', req.params.filename);
  res.setHeader('Content-Type', 'image/jpeg'); // ✅ Key line
  res.sendFile(filePath, { root: '.' });
});


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
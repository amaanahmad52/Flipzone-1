const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileupload = require('express-fileupload');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Cors middleware
app.use(cors({
    origin:"*"
}));

// Cors options
// var corsOptions = {
//   origin: '*',
//   // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

// Cookie parser middleware
app.use(cookieParser());

// File upload middleware
app.use(fileupload());

// Mounting routes
app.use('/api/v1', require('./routes/ProductsRoute'));
app.use('/api/v1', require('./routes/UserRoute'));
app.use('/api/v1', require('./routes/OrderRoute'));

module.exports = app;

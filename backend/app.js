const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileupload = require('express-fileupload');
const dotenv=require("dotenv")
dotenv.config()
const app = express();
app.use(cookieParser());
// Body parser middleware
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
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
app.use('/api/v1', require('./routes/PaymentRoute'));

module.exports = app;

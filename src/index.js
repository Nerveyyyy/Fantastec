require('dotenv').config();

// Require all packages needed.
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');

// Route in different file to make program more manageable
const indexRouter = require('./routes');

const app = express();

// Security Packages
app.use(compression());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// Start router
app.use('/', indexRouter);

// Return data if page doesnt exist.
app.use((req, res) => {
    res.status(404);
    res.json({ success: false, body: "Page Not Found" });
});

module.exports = app;

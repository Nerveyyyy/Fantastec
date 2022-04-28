require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');

const indexRouter = require('./routes');

const app = express();

app.use(compression());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use('/', indexRouter);

app.use((req, res, next) => {
    res.status(404);
    res.json({ success: false, body: "Page Not Found" });
});

module.exports = app;

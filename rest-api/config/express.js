const express = require('express');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const cookieSecret = process.env.COOKIESECRET || 'MySecret';
// const { errorHandler } = require('../utils')

module.exports = (app) => {
    app.use(express.json());

    app.use(cookieParser(cookieSecret));
    //app.use(cors);

    app.use(express.static(path.resolve(__basedir, 'static')));

    // app.use(errorHandler(err, req, res, next));
};

"use strict";

const express = require('express');

let IndexController = (server) => {
    let router = express.Router();

    /* GET home page. */
    router.get('/',  (req, res, next) => {
        res.render('index');
    });
    return router;
};

module.exports = IndexController;

"use strict";

const express = require('express');

let IndexController = function(server) {
    let router = express.Router();

    /* GET home page. */
    router.get('/', function (req, res, next) {
        res.render('index');
    });
    return router;
};

module.exports = IndexController;

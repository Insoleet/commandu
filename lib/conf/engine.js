"use strict";

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

module.exports = function(server) {

    // view engine setup
    server.set('views', path.join(__dirname, '../../app/views'));
    server.set('view engine', 'jade');

    // uncomment after placing your favicon in /public
    //server.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    server.use(logger('dev'));
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({extended: false}));
    server.use(cookieParser());
    server.use(express.static(path.join(__dirname, '../../public')));
};
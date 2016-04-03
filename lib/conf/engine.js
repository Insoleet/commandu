"use strict";

const express = require('express');
const session = require('express-session');
const path = require('path');
const passport = require('passport');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

module.exports = (server) => {

    // view engine setup
    server.set('views', path.join(__dirname, '../../app/views'));
    server.set('view engine', 'jade');

    // uncomment after placing your favicon in /public
    //server.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    server.use(logger('dev'));
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({extended: false}));
    server.use(cookieParser());
    server.use(session({secret: 'supernova', saveUninitialized: true, resave: true}));
    server.use(express.static(path.join(__dirname, '../../public')));
    server.passport = passport;
    server.use(server.passport.initialize());
    server.use(server.passport.session());


    server.isAuthenticated = (req, res, next) => {
        if (req.isAuthenticated())
            return next();
        res.redirect('/');
    };
};
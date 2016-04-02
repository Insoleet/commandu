"use strict";

var co = require('co');
const express = require('express');
const crypto = require('crypto');
const passport = require('passport');

const AccountController = function(server) {
    const getRegister = (req, res, next) => {
        res.render('account/register');
    };

    const getLogin = (req, res, next) => {
        res.render('account/login');
    };

    const router = express.Router();
    router.get('/register', getRegister);
    router.post('/register', server.passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/account/register'
    }));
    router.get('/login', getLogin);
    router.post('/login', server.passport.authenticate('local-signin', {
        successRedirect: '/',
        failureRedirect: '/account/login'
    }));
    return router;
};


module.exports = AccountController;

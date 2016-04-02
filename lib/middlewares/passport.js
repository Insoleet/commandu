"use strict";
const co = require('co');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const AccountService = require('../../services/account');


module.exports = function(server) {
    const signin = (req, username, password, done) => co(function* () {
        try
        {
            const user = yield AccountService(server).loginAccount(username, password);
            if (user) {
                console.log("LOGGED IN AS: " + user.email);
                req.session.success = {
                    title: "Login",
                    text: 'You are successfully logged in ' + user.email + '!'
                };
                done(null, user);
            }
            if (!user) {
                console.log("COULD NOT LOG IN");
                req.session.error = {
                    title: "Login",
                    text: 'Could not log user in. Please try again.'
                }; //inform user could not log them in
                done(null, user);
            }
        }
        catch (err) {
            console.log(err.message);
        }
    });

    const signup = (req, username, password, done) => co(function* () {
        try
        {
            const user = yield AccountService(server).registerAccount(username, password);
            if (user) {
                console.log("LOGGED IN AS: " + user.email);
                req.session.success = {
                    title: "Register",
                    text: 'You are successfully registered and logged in ' + user.email + '!'
                };
                done(null, user);
            }
            if (!user) {
                console.log("COULD NOT LOG IN");
                req.session.error = {
                    title: "Register",
                    text: 'That username is already in use, please try a different one.'
                };
                done(null, user);
            }
        }
        catch (err) {
            console.log(err.body);
        }
    });

    server.passport.use('local-signin',
        new LocalStrategy(
            {passReqToCallback: true,
                usernameField: "user_mail",
                passwordField: "user_passwd"}, //allows us to pass back the request to the callback
            signin
        ));

    server.passport.use('local-signup', new LocalStrategy(
        {passReqToCallback: true,
        usernameField: "user_mail",
        passwordField: "user_passwd"}, //allows us to pass back the request to the callback
        signup
    ));

    server.passport.serializeUser(function(user, done) {
        console.log("serializing " + user.email);
        done(null, user);
    });

    server.passport.deserializeUser(function(obj, done) {
        console.log("deserializing " + obj);
        done(null, obj);
    });

};
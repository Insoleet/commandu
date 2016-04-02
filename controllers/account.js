"use strict";

const express = require('express');
const mongoose = require('mongoose');
const crypto = require('crypto');

let AccountController = function(server) {
    let router = express.Router();

    router.get('/register', (req, res, next) => {
        res.render('account/register');
    });

    router.post('/register', (req, res) =>  {
        // Set our internal DB letiable
        let db = req.db;

        // Get our form values. These rely on the "name" attributes
        let userEmail = req.body.user_mail;
        let userPassword = req.body.user_passwd;

        if (userEmail != req.body.user_mail_2) {
            res.send("Your emails were different");
        }
        if (userPassword != req.body.user_passwd_2) {
            res.send("Your passwords were different");
        }

        // Creating one user.
        let account = new mongoose.Model('Account')({
            mail: userEmail,
            passwordHash: crypto.createHash('sha256').update(userPassword).digest('base64')
        });

        // Saving it to the database.
        account.save( err => res.send("There was a problem adding the information to the database.") );

        // And forward to success page
        res.redirect("success");
    });
    return router;
};


module.exports = AccountController;

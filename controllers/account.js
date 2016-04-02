"use strict";

const express = require('express');
const crypto = require('crypto');

let AccountController = function(server) {
    let router = express.Router();

    router.get('/register', (req, res, next) => {
        res.render('account/register');
    });

    router.post('/register', (req, res) =>  {
        // Get our form values. These rely on the "name" attributes
        let userEmail = req.body.user_mail;
        let userPassword = req.body.user_passwd;

        if (userEmail != req.body.user_mail_2) {
            res.send("Your emails were different");
        }
        if (userPassword != req.body.user_passwd_2) {
            res.send("Your passwords were different");
        }

        let account = new server.db.model('Account')({
            mail: userEmail,
            passwordHash: crypto.createHash('sha256').update(userPassword).digest('base64')
        });
        let context = {}

        // Saving it to the database.
        account.save( err => {
            if (err) {
                context.errorMessage = {
                    title: "Account creation",
                    text: "There was a problem adding the information to the database."
                }
            }
            else {
                context.successMessage = {
                    title: "Account creation",
                    text: "Succefully created your account"
                };
            }

            // And forward to success page
            res.render("index", context);
        });
    });
    return router;
};


module.exports = AccountController;

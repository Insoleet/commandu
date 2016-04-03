"use strict";

var co = require('co');
const express = require('express');
const crypto = require('crypto');
const passport = require('passport');

const AccountService = function(server) {
    const registerAccount = (userEmail, password) => co(function*() {
        const account = new server.db.model('Account')({
            email: userEmail,
            passwordHash: crypto.createHash('sha256').update(password).digest('base64')
        });

        // Saving it to the database.
        try {
            yield account.save();
        }
        catch (err) {
            console.log(err.message)
            return false;
        }
        return account;
    });

    const loginAccount = (userEmail, password) => co(function*() {
        try {
            const account = yield server.db.model('Account').findOne({email: userEmail});
            if (account && account.passwordHash == crypto.createHash('sha256').update(password).digest('base64')) {
                return account;
            }
            else {
                return false;
            }
        }
        catch (err) {
            console.log(err.message);
            return false;
        }
    });

    const getAccount = (id) => co(function*() {
        try {
            const account = yield server.db.model('Account').findById(id);
            if (account) {
                return account;
            }
            else {
                return false;
            }
        }
        catch (err) {
            console.log(err.message);
            return false;
        }
    });

    return {
        registerAccount: registerAccount,
        loginAccount: loginAccount,
        getAccount: getAccount
    };
};


module.exports = AccountService;

"use strict";

const mongoose = require("mongoose");

module.exports = function(server) {
    let uristring =
        process.env.MONGOLAB_URI ||
        process.env.MONGOHQ_URL ||
        'mongodb://localhost/commandu';

    // Makes connection asynchronously.  Mongoose will queue up database
    // operations and release them when the connection is complete.
    const db = mongoose.connect(uristring, function (err, res) {
        if (err) {
            console.log ('ERROR connecting to: ' + uristring + '. ' + err);
        } else {
            console.log ('Succeeded connected to: ' + uristring);
        }
    });

    let models = ['Account'];
    models.forEach(function (entity) {
        db.model(entity, require('../../models/' + entity.toLowerCase()));
    });
    return db;
};
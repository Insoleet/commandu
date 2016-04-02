"use strict";

const mongoose = require("mongoose"); // The reason for this demo.

module.exports = function(server) {
    let uristring =
        process.env.MONGOLAB_URI ||
        process.env.MONGOHQ_URL ||
        'mongodb://localhost/commandu';

    // Makes connection asynchronously.  Mongoose will queue up database
    // operations and release them when the connection is complete.
    mongoose.connect(uristring, function (err, res) {
        if (err) {
            console.log ('ERROR connecting to: ' + uristring + '. ' + err);
        } else {
            console.log ('Succeeded connected to: ' + uristring);
        }
    });

    let models = ['Account'];
    models.forEach(function (entity) {
        mongoose.model(entity, require('../../models/' + entity.toLowerCase()));
    });
};
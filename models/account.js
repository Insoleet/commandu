const mongoose = require('mongoose')

const AccountSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true},
    passwordHash: {
        type: String,
        required: true
    }
});

module.exports = AccountSchema;
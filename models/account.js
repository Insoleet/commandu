const mongoose = require('mongoose')

const AccountSchema = new mongoose.Schema({
    email: { type: String },
    passwordHash: { type: String }
});

module.exports = AccountSchema;
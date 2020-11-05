const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 3,
        max: 12
    },
    email: {
        type: String,
        require: true,
        min: 6,
        max: 250
    },
    password: {
        type: String,
        require: true,
        min: 6,
        max: 100
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);
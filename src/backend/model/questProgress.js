const mongoose = require('mongoose');

const questProgress= new mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 3,
        max: 12
    },

    quest1: {
        type: Boolean,
        default: false
    },

    quest2: {
        type: Boolean,
        default: false
    },

    quest3: {
        type: Boolean,
        default: false
    },
});

module.exports = mongoose.model('questProgress', questProgress);
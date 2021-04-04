//This defines the user progress schema used to store users' quests progress in the MongoDB database
const mongoose = require('mongoose');

const userProgress= new mongoose.Schema({
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

    quest4: {
        type: Boolean,
        default: false
    },

    quest5: {
        type: Boolean,
        default: false
    },
});

module.exports = mongoose.model('userProgress', userProgress);
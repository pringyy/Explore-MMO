const mongoose = require('mongoose');

const userProgressSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    quest1: {
        type: Boolean,
        default: false,
    },
    quest2: {
        type: Boolean,
        default: false
    },
    
    quest3: {
        type: Boolean,
        default: Date.now
    },

    quest4: {
        type: Boolean,
        default: Date.now
    },

});

module.exports = mongoose.model('userProgress', userProgressSchema);
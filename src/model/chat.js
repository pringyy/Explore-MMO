const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Chats', chatSchema);
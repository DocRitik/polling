const mongoose = require('mongoose')

const pollSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        required: true
    },
    voted_option: {
        type: Number,
        default: 0,
    }
});

module.exports = mongoose.model('poll', pollSchema);
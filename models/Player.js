const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
    apiID: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    Team: {
        type: String,
        required: true
    },
    User: {
        type: String,
        required: true
    }
});

module.exports = Player = mongoose.model('player', PlayerSchema);

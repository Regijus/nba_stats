const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
    apiID: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    User: {
        type: String,
        required: true
    }
});

module.exports = Team = mongoose.model('team', TeamSchema);

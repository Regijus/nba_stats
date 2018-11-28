const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: false
    },
    banned: {
        type: Boolean,
        default: false
    },
    admin: {
        type: Boolean,
        default: false
    }
});

module.exports = User = mongoose.model('user', UserSchema);

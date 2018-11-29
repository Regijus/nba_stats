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
    },
    registrationDate: {
        type: Date,
        default: new Date()
    },
    name: {
        type: String,
        default: ''
    },
    surname: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    age: {
        type: Number,
        default: 0
    },
    gender: {
        type: String,
        default: 'Vyras'
    }
});

module.exports = User = mongoose.model('user', UserSchema);

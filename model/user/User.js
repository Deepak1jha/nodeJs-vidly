const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxLength: 10
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxLength: 10
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxLength: 10
    }
});

module.exports = mongoose.model('users', userSchema);
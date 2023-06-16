const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
    },  
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: Number,
        min: 10,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
    },
    cpassword: {
        type: String,
        required: true,
        minlength: 3,
    },
    contactnumber: {
        type: Number,
        required: true,
        min: 10,
    },

    admin: {
        type: Boolean,
        required: true,
    },

    superadmin: {
        type: Boolean,
        required: true,
    },

    address: {
        type: String,
        required: true,

    },

    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]

});



// generating tokens

userSchema.plugin(validator);
const User = mongoose.model('User', userSchema);
module.exports = User;
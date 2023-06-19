const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongooseUniqueValidator = require('mongoose-unique-validator');
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

    password: {
        type: String,
        required: true,
        minlength: 3,
    },
  
    contactnumber: {
        type: Number,
        // required: true,
        min: 10,
    },

    admin: {
        type: Boolean,
        // required: true,
    },

    superadmin: {
        type: Boolean,
        // required: true,
    },

    address: {
        type: String,
        // required: true,

    },

});



// generating tokens
userSchema.plugin(mongooseUniqueValidator);
const User = mongoose.model('User', userSchema);
module.exports = User;
'use strict';

var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    moment = require('moment'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    hash_password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: moment()
    }
});

UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.hash_password);
};

mongoose.model('User', UserSchema);
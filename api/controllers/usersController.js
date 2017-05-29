'use strict'

var mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcryptjs'),
    User = mongoose.model('User');

exports.register = function(req, res) {
    var newUser = new User(req.body);
    newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
    newUser.save(function(err, user) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            user.hash_password = undefined;
            return res.json(user);
        }
    });
};

exports.signin = function(req, res) {
    User.findOne({
        email: req.body.email
    }, function(err, user) {
        if (!user) {
            res.status(401).json({ message: 'Authentication failed. User not found. ' });
        } else if (user) {
            if (!user.comparePassword(req.body.password)) {
                res.status(401).json({ messafe: 'Authentication failed. Wrong password.' });
            } else {
                return res.json({ token: jwt.sign({ email: user.email, name: user.name, _id: user._id }, 'RESTFULAPIs') });
            }
        }
    });
};

exports.loginRequired = function(req, res, next) {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorised user' });
    }
};
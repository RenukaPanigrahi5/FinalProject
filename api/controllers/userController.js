const User = require('../model/userModel');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}

exports.addNewUser = function (req, res) {
    let newUser = new User(req.body);
    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to register user' });
        } else {
            res.json({ json: true, msg: 'User registered successfully' });
        }
    });
};

exports.isUserExists = function (req, res) {
    const username = req.body.username;
    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (user) {
            return res.json({ success: true, msg: 'User exists already with username=' + username });
        }
    });
};
exports.authenticateUser = function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({ success: false, msg: 'User not found' });

        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign({ data: user }, config.secret, {
                    expiresIn: 604800 //1week
                });
                res.json({ success: true, msg: 'valid User' });
            } else {
                return res.json({ success: false, msg: 'Wrong Password' });
            }

        });
    });
};

exports.listAllUsers = function (req, res) {
    User.getAllUsers(req, (err, user) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to listAll users' });
        } else {
            res.json({
                success: true,
                msg: 'User listed successfully',
                users: user

            });
        }
    });
};

exports.removeUserDetails = function (req, res) {
    User.removeUserDetails(req.body.username, (err, user) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to Remove users' + err });
        } else {
            res.json({
                success: true,
                msg: 'User removed successfully'

            });
        }
    });
};
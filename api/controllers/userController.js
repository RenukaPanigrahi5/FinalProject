const User = require('../model/userModel');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const _= require('lodash');

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
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByEmail(email, (err, user) => {
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
                return res.status(200).json({"token": token});
            } else {
                return res.json(404).json(info);
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

exports.getUserProfileByUsername = function (req, res) {
    const email = "re@gmail.com";
   console.log("getUserProfileByUsername() email--"+ email);
   User.getUserByEmail(email,(err, user) => {
       console.log("getUserProfileByUsername() user--"+ user);
       if(err) throw err;
       if(!user)
       return res.status(404).json({status: false, message: "User record not found"});
       else
       return res.status(200).json({status: true, user:_.pick(user,['fullName', 'email', 'username', 'height', 'weight', 'gender', 'address'])});
   });

};
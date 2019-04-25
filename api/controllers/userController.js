const User = require('../model/userModel');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const _ = require('lodash');

function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}

exports.addNewUser = function (req, res) {
    const email = req.body.email;   
    let newUser = new User(req.body);
    console.log("addNewUser"+ email);
    User.addUser(newUser, (err, user) => {
        if (err) {   
            console.log("addNewUser"+ email);
            res.json({ success: false, msg: 'Failed to register user' });
        } else {      
            console.log("addNewUser else "+ email);     
            return res.status(201).send({ id_token: createToken(email) });
        }
    });
};

exports.isUserExists = function (req, res) {
    const email = req.body.email;
    User.getUserByEmail(username, (err, user) => {
        if (err) throw err;
        if (user) {            
            res.status(200).send(" User exists already with "+ email);
        }
    });
};
exports.authenticateUser = function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    console.log("email "+ email);
    User.getUserByEmail(email, (err, user) => {
        if (err) throw err;
        if (!user) {
            console.log("User Not Found");
            return res.json({ success: false, msg: 'User not found' });            
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                console.log("Password matched"+ email)
                res.status(201).send({ 
                                        id_token: createToken(email),
                                        user:_.pick(user,['fullName', 'email', 'username', 'height', 'weight', 'gender', 'address'])}
                                    );
            } else {
                console.log("Password not matched");
                return res.json(404).json("password not matching");
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
    const email = req.query.email;
    
    console.log("email-- "+ email);
    User.getUserByEmail(email,(err, user) => {
       console.log("getUserProfileByUsername() user--"+ user);
       if(err) throw err;
       if(!user)
       return res.status(404).json({status: false, message: "User record not found"});
       else
       return res.status(200).json({status: true, user:_.pick(user,['fullName', 'email', 'username', 'height', 'weight', 'gender', 'address'])});
    });

};

function createToken(user) {
    const token = jwt.sign(_.omit(user, 'password'), config.secret, { expiresInMinutes: 60*5 });
    console.log("token in the server for user "+ token);
    return token;
  }
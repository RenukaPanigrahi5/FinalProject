const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../model/user');

// Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    username: req.body.username,
    password: req.body.password
  });
 
  //If it is a new user it goes to this method
  User.addUser(newUser, (err, user) => {
    if(err){
      res.json({success: false, msg:'Failed to register user'});
    } else {
      res.json({success: true, msg:'User registered'});
    }
  });
  //Add the user personal details
  User.addUserPersonalData(newUser, (err, user) => {
    if(err){
      res.json({success: false, msg:'Failed to add user personal details'});
    } else {
      res.json({success: true, msg:'User personal details are registered'});
    }
  });
 //Add the User BMI 
  User.addUserBmi(newUser, (err, user) => {
    if(err){
      res.json({success: false, msg:'Failed to get the User BMI'});
    } else {
      res.json({success: true, msg:'Successfully registered BMI details'});
    }
  });
});

//get UserDetailsByUserName
router.post('/getUserDetailsByName', (req, res, next) => {
  const username = req.body.username;
  User.getUserByName(username, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }
    else{
      return res.json({success: true, user: {name: username} });
    }
  });
});

//get User BMI
router.get('/getUserBMI/:username', (req, res, next) => {
  const username = req.body.username;
  User.getUserByName(req.params.username, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }
    else{
      return res.json({success: true, user: {name: username} });
    }
  });
});

//get User Diet By Category
router.get('/getUserDiet/:username', (req, res, next) => {
  //Need to implement.
});

//get Workouts for User
router.get('/getUserWorkOut/:username', (req, res, next) => {
  //Need to implement.
  //find the user Bmi by username
  User.findUserBmi(username, (err, user) => {
     ///implement.
    });
});

//Based on the height,weight,age get the workouts
//router.getDietChart(height, weight, age)
{
  
}
//get the workout for the User
///router.getWorkOuts(username)
{
  
}

//Sharing with friends
//router.getSharingFriends(username)
{
  
}


// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign({data: user}, config.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});

module.exports = router;

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
//Register
router.post('/register', userController.addNewUser);
//if the userNames is already exists warns in advance
router.get('/checkUserExistsAlready', userController.isUserExists);
//authenticating the user while logging by encrypting pwd
router.post('/authenticate', userController.authenticateUser);
//display users who are using this app, can be used for search their friends
router.get('/displayAllUsers', userController.listAllUsers);
//admin user can delete the user if one terminates
router.delete('/deleteUsers', userController.removeUserDetails);
router.get('/userProfile', userController.getUserProfileByUsername);

module.exports = router;

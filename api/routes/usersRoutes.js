const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../model/user');

// Register
router.post('/register', userController.addNewUser);
router.get('/checkUserExistsAlready', userController.isUserExists);
router.post('/authenticate', userController.authenticateUser);
router.post('/displayUsers', userController.listUsers);
  

module.exports = router;

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
//Register

router.post('/register', userController.addNewUser);
router.get('/checkUserExistsAlready', userController.isUserExists);
router.post('/authenticate', userController.authenticateUser);
router.get('/displayAllUsers', userController.listAllUser);

module.exports = router;

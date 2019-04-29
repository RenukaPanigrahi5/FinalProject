const express = require('express');
const router = express.Router();
const ActivityController = require('../controllers/activityController');

router.post('/addActivities', ActivityController.newActivity);
router.get('/getActivityInfo', ActivityController.getActivityInfoByEmail);

module.exports = router;
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const habitController = require('../controllers/habitcontroller')


router.get('/', verifyToken, habitController.index)
router.get('/user/:userId',  habitController.getByUserId)
router.post('/', habitController.createHabit)
router.patch('/habit/:habitID', habitController.updateHabit)
router.get('/habit/:habitID', habitController.getByHabitId)
module.exports = router;

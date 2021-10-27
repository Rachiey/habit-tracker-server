const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const habitController = require('../controllers/habitcontroller')


router.get('/', habitController.index)
router.get('/user/:userId',  habitController.getByUserId)
router.post('/', habitController.createHabit)
router.patch('/habit/:habitID/:change', habitController.updateHabit)
router.get('/habit/:habitID', habitController.getByHabitId)
router.delete('/habit/:habitID', habitController.deleteHabit)
module.exports = router;

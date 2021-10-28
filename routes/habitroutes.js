const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const habitController = require('../controllers/habitcontroller')



router.get('/', verifyToken, habitController.index)
router.get('/user/:userId', verifyToken, habitController.getByUserId)
router.post('/', verifyToken, habitController.createHabit)
router.patch('/habit/:habitID/:change', verifyToken, habitController.updateHabit)
router.get('/habit/:habitID', verifyToken, habitController.getByHabitId)
router.delete('/habit/:habitID', verifyToken, habitController.deleteHabit)

module.exports = router;

const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const habitController = require('../controllers/habitcontroller')


router.get('/', habitController.index)
router.get('/:userId', habitController.getByUserId)
router.post('/', habitController.createHabit)
router.patch('/:habitID', habitController.updateHabit)
router.get('/:habitID', habitController.getByHabitId)
module.exports = router;

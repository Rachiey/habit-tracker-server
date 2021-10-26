const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const habitController = require('../controllers/habitcontroller')


router.get('/', habitController.index)
router.get('/:userId', habitController.getByUserId)
router.post('/', habitController.createHabit)
module.exports = router;

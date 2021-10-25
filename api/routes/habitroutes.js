const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const habitController = require('../controllers/habitcontroller')


router.get('/', verifyToken, habitController.index)
router.get('/:userId', verifyToken, habitController.getByUserId)
// router.post('/', habitController.create)
module.exports = router;

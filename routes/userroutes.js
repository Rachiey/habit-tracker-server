const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middleware/auth');
const userController = require('../controllers/usercontroller.js')

// router.get('/', userController.index)
router.get('/:userId', userController.getUserById)
router.post('/changePassword', userController.changePassword)

module.exports = router;

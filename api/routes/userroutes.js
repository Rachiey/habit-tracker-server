const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middleware/auth');
const userController = require('../controllers/usercontroller.js')

router.get('/', verifyToken, userController.index)
router.get('/:userId', verifyToken, userController.getUserById)
router.post('/changePassword', verifyToken, userController.changePassword)
module.exports = router;

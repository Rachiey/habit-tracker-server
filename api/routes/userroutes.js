const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller.js')
router.get('/', userController.index)
router.get('/:userId', userController.getUserById)
// router.post('/', userController.create)
module.exports = router;

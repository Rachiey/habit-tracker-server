const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habitcontroller')
router.get('/', habitController.index)
router.get('/:userId', habitController.getByUserId)
// router.post('/', habitController.create)
module.exports = router;

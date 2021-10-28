const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const authController = require('../controllers/authcontroller')


router.post('/login', authController.login)
router.post('/register', authController.register)
// router.get('/', authController.deleteMe)


module.exports = router;

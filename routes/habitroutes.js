const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const habitController = require('../controllers/habitcontroller')



// router.get('/', verifyToken, habitController.index)
router.get('/user/:userId', verifyToken, habitController.getByUserId)
router.post('/', verifyToken, habitController.createHabit)
<<<<<<< HEAD
router.patch('/habit/:habitID/:change',verifyToken, habitController.updateHabit)
router.get('/habit/:habitID', verifyToken, habitController.getByHabitId)
router.delete('/habit/:habitID', verifyToken, habitController.deleteHabit)
=======
router.patch('/habit/:habitID/:change', verifyToken, habitController.updateHabit)
router.get('/habit/:habitID', verifyToken, habitController.getByHabitId)
router.delete('/habit/:habitID', verifyToken, habitController.deleteHabit)

>>>>>>> 72c8562d8c91def893bbb3eb634db20ce8048d41
module.exports = router;

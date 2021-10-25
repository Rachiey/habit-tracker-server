const Habit = require('../models/habitmodels')
async function index(req, res) {
    try {
        const habit = await Habit.all;
        res.status(200).json(habit);
    } catch (err) {
        res.status(500).send(err);
    }
}

async function getByUserId (req, res) {
    try {
        const habit = await Habit.getByUser_Id(req.params.userId);
        res.status(200).json(habit);
    } catch (err) {
        res.status(500).send(err);
    }
}
module.exports = {index, getByUserId}
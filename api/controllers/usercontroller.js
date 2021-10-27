const User = require('../models/usermodels')
async function index(req, res) {
    try {
        const user = await User.all;
        res.status(200).json(user);
    } catch (err) {
        res.status(500).send(err);
    }
}

async function getUserById (req, res) {
    try {
        const user = await User.getUserBy_Id(req.params.userId);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).send(err);
    }
}

async function changePassword (req, res) {
    try{

        const user = await User.changePassword(req.body)
        res.status(200).json(user)
    } catch (err) {
        res.status(500).send(err);
    }
}
module.exports = {index, getUserById, changePassword}
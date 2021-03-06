require('dotenv').config();

const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const User = require('../models/usermodels');

async function register (req, res) {
    try {
        const salt = await bcrypt.genSalt();
        const hashed = await bcrypt.hash(req.body.password, salt)
        await User.create(req.body.name, req.body.email, hashed)
        res.status(201).json({msg: 'User created'})
    } catch (err) {
        res.status(500).json({err});
    }
}

async function login (req, res) {
    try {
        console.log(req.body.email)
        console.log(req.body.password);
        const user = await User.findByEmail(req.body.email)
        console.log(user);
        if(!user){ throw new Error('No user with this email') }
        const authed = await bcrypt.compare(req.body.password, user.password)

        if (!!authed){
            const payload = { name: user.name, email: user.email, userId:user.id }
            const sendToken = (err, token) => {
                if(err){ throw new Error('Error in token generation') }
                res.status(200).json({
                    success: true,
                    token: "Bearer " + token,
                });
            }
            jwt.sign(payload, process.env.SECRET, { expiresIn: 3600 }, sendToken);
        } else {
            throw new Error('User could not be authenticated')  
        }
    } catch (err) {
        console.log(err);
        res.status(401).json({ err });
    }
}
        
        

// async function deleteMe (req, res) {
//     try {
//         const salt = await bcrypt.genSalt();
//         const hashed = await bcrypt.hash("jamesisthebest", salt)
//         res.json(hashed)
//     } catch (err) {
//         console.warn(err)
//         res.status(500).json({ err });
//     }
// }

module.exports = {login, register}
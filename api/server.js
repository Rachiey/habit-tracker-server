const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

const habitsRoutes = require('./routes/habitroutes')
const userRoutes = require('./routes/userroutes')
const authRoutes=require('./routes/authroutes')
server.use('/habits', habitsRoutes)
server.use('/users', userRoutes)
server.use('/auth', authRoutes)


server.get('/', (req, res) => res.send('Welcome to the habit tracker'))

module.exports = server
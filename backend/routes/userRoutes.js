const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken')

// -------------Registration of a User into Database--------------

userRouter.post('/users/register', async (req, res) => {
    try {
        const { name, emailId, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            emailId,
            password: hashPassword,
        })
        await user.save();
        res.send("Sign Up Succesfully");
    } catch (err) {
        res.status(400).send("Could'nt Register " + err.message)
    }
})

userRouter.post('/users/login', async (req, res) => {

    try {
        const { emailId, password } = req.body;
        console.log(emailId, password)
        const user = await User.findOne({ emailId })
        if (!user) {
            throw new Error("Invalid credentials")
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error("Invalid credentials")
        }

        const token = await jwt.sign({ _id: user.userId }, "Stumble");
        res.cookie('token', token).send("login Succesful");

    } catch (err) {
        res.status(400).send("Could'nt Login " + err.message)
    }
})

module.exports = userRouter


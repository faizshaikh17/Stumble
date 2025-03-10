const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const userRouter = express.Router();

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
        res.status(400).send("Could'nt Sign Up " + err.message)
    }
})

module.exports = userRouter


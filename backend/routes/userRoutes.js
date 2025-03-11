const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken')
const { isSignupUserValidated, isLoginUserValidated } = require('../validations/validator')
const logger = require('../middlewares/authenticated')

// -------------Registration of a User into Database--------------

userRouter.post('/users/register', async (req, res) => {
    try {
        isSignupUserValidated(req)
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

// -------------Authentication of a User--------------

userRouter.post('/users/login', async (req, res) => {

    try {
        isLoginUserValidated(req);
        const { emailId, password } = req.body;
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

// -------------Logout feature for a User--------------

userRouter.post('/users/logout', async (req, res) => {

    try {
        res.cookie('token', null, { expires: new Date(Date.now()) }).send("logout Succesful");
    } catch (err) {
        res.status(400).send("Could'nt Logout " + err.message)
    }
})

// -------------Profile of a User--------------

userRouter.get('/users/profile', logger, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (err) {
        res.status(400).send("Could'nt find Profile " + err.message)
    }
})

// -------------Update profile of a User--------------

userRouter.put('/users/profile', logger, async (req, res) => {
    try {
        const userId = req.user.userId
        const { name, emailId } = req.body
        const user = await User.findByIdAndUpdate(userId, { name, emailId });
        await user.save();
        res.send(user);
    } catch (err) {
        res.status(400).send("Could'nt find Profile " + err.message)
    }
})

// -------------Delete profile of a User--------------

userRouter.delete('/users/profile', logger, async (req, res) => {
    try {
        const user = req.user
        await User.findByIdAndDelete(user);
        res.send("Profile removed");
    } catch (err) {
        res.status(400).send("Could'nt find Profile " + err.message)
    }
})

// -------------Password reset of a User--------------

userRouter.put('/users/forgot-password', logger, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const { emailId, newPassword } = req.body;

        if (emailId !== loggedInUser.emailId) {
            throw new Error("Enter correct email")
        }
        const isSamePassword = await bcrypt.compare(newPassword, loggedInUser.password);
        if (isSamePassword) {
            throw new Error("Password must be different")
        }

        const hashPassword = await bcrypt.hash(newPassword, 10)
        const user = await User.findByIdAndUpdate(loggedInUser.userId, { password: hashPassword })
        await user.save();
        console.log(user)
        res.send("Password updated");
    } catch (err) {
        res.status(400).send("Could'nt update password, " + err.message)
    }
})




module.exports = userRouter


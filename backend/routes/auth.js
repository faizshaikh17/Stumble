import express from 'express'
import bcrypt from 'bcrypt'
import User from '../models/user';
const authRouter = express.Router();

// -------------Registration of a User into Database--------------

authRouter.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashPassword,
        })
        await user.save();
        res.send("Sign Up Succesfully");
    } catch (err) {
        res.status(400).send("Could'nt Sign Up" + err.message)
    }
})


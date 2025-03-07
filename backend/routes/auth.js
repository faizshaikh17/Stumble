import express from 'express'
import User from '../models/user';
const authRouter = express.Router();

authRouter.post('/signup', async (req, res) => {
    try {
        const { name, email, password, userId } = req.body;
        const hashPassword = await bcrypt
    } catch (err) {
        res.status(400).send("Could'nt Sign Up" + err.message)
    }
})


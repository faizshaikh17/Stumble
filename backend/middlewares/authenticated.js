const jwt = require('jsonwebtoken');
const User = require('../models/user');

const logger = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        const loggedInUserObj = await jwt.verify(token, "Stumble");
        const { _id } = loggedInUserObj;
        const user = await User.findById(_id);
        if (!user) {
            throw new Error("Invalid credentials")
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(400).send("Login again " + err.message)
    }
}

module.exports = logger;


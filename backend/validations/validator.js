const validator = require('validator');
const User = require('../models/user')

// ---------------------Signup User validation------------------------

const isSignupUserValidated = (req) => {
    const { name, emailId, password } = req.body;
    if (!name || !emailId || !password) {
        throw new Error("Enter User details correctly")
    }
    else if (!validator.isEmail(emailId)) {
        throw new Error("Enter correct Email");
    }
    else if (!validator.isStrongPassword(password)) {
        throw new Error("Enter strong password");
    }
}


// ---------------------Login User validation------------------------


const isLoginUserValidated = (req) => {
    const { emailId, password } = req.body;
    if (!emailId || !password) {
        throw new Error("Enter login details correctly")
    }
    else if (!validator.isEmail(emailId)) {
        throw new Error("Enter correct email");
    }
    else if (!validator.isStrongPassword(password)) {
        throw new Error("Enter strong password");
    }
}


module.exports = { isSignupUserValidated, isLoginUserValidated };
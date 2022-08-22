const express = require('express');
const router = express.Router();
const { Joi, validate } = require('express-validation');
const md5 = require('md5');
const User = require('../models/user');

/**
 * API: /auth/login
 */
router.post("/login", validate({
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required()
    })
}, {}, {}), function (req, res, next) {
    const {
        email,
        password
    } = req.body;

    var result = "";
    if(email !== 'admin@gmail.com') {
        result = "Invalid Email";
    }
    else if(password !== 'password') {
        result = "Incorrect Password";
    }
    else {
        result = "success";
        const newUser = new User({"email": email, "password": md5(password)});
        newUser.save();
    }

    res.json({
        data: result
    });
});

/**
 * API: /auth/register
 */
router.post("/register", validate({
    body: Joi.object({
        firstName: Joi.string().min(3).max(255).required(),
        lastName: Joi.string().min(3).max(255).required(),
        email: Joi.string().email().required(),
        password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required()
    })
}, {}, {}), async function (req, res, next) {
    try{
        const {
            firstName, 
            lastName,
            email,
            password
        } = req.body;

        const existOne = await User.findOne({
            email: email
        });
        if(existOne) {
            return res.json({
                status: false,
                message: "Already exist"
            })
        }
        const user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.password = md5(password);

        await user.save();

        res.json({
            status: true,
            message: "success"
        });
    }
    catch(e) {
        console.log("Register Error: ", e);
    }
});

module.exports = router;
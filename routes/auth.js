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
}, {}, {}), async function (req, res, next) {
    const {
        email,
        password
    } = req.body;

    var result = "", status = false;

    const user = await User.findOne({
        email: email,
        password: md5(password)
    });

    if(!user) {
        result = "No user!";
        status = false;
    }
    else {
        result = "success";
        status = true;
    }

    res.json({
        status: status,
        message: result
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
        console.log(email);
        if(existOne) {
            return res.json({
                status: false,
                message: "User already exist!"
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
            message: "Successfully Registered!"
        });
    }
    catch(e) {
        console.log("Register Error: ", e);
    }
});

module.exports = router;
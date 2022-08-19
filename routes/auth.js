var express = require('express');
var router = express.Router();
var { Joi, validate } = require('express-validation');
var User = require('../models/user');

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
        const newUser = new User({"email": email, "password": password});
        newUser.save();
    }

    res.json({
        data: result
    });
});

module.exports = router;
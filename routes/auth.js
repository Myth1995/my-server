var express = require('express');
var router = express.Router();
var { Joi, validate } = require('express-validation');

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
    if(email !== 'admin@gmail.com' || password !== 'password') {
        result = "failed";
    }
    else {
        result = "success";
    }

    res.json({
        data: result
    });
});

module.exports = router;
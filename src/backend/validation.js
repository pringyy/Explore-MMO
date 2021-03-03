const Joi = require('@hapi/joi');

//Used to validate the register form
const registerValidation = data => {
    const schema  = Joi.object ({
        username: Joi.string().min(3).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
};

//Used to validate the login form
const loginValidation = data => {
    const schema  = Joi.object ({
        username: Joi.string().min(3).required(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
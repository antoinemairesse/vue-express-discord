const Joi = require("joi");

const signup = {
    body: Joi.object().keys({
        username: Joi.string().alphanum().max(30).required(),
        password: Joi.string().min(5).required(),
        email: Joi.string().email().required()
    })
};

const login = {
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().min(5).required()
    })
};

module.exports = {
    signup,
    login
};

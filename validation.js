const Joi = require('joi');

const userValidation = (user) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(255).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(user);
};

module.exports = {
    userValidation,
};
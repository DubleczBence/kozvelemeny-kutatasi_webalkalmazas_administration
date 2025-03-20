const Joi = require('joi');

const userValidation = (user) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(255).required()
            .messages({
                'string.base': 'Name must be a text',
                'string.min': 'Name must be at least 3 characters long',
                'string.max': 'Name cannot exceed 255 characters',
                'any.required': 'Name is required'
            }),
        email: Joi.string().email().required()
            .messages({
                'string.base': 'Email must be a text',
                'string.email': 'Email must be a valid email address',
                'any.required': 'Email is required'
            }),
        password: Joi.string().min(6).required()
            .messages({
                'string.base': 'Password must be a text',
                'string.min': 'Password must be at least 6 characters long',
                'any.required': 'Password is required'
            })
    });
    return schema.validate(user, { abortEarly: false });
};

const companyValidation = (company) => {
    const schema = Joi.object({
        cegnev: Joi.string().min(2).max(255).required()
            .messages({
                'string.base': 'Company name must be a text',
                'string.min': 'Company name must be at least 2 characters long',
                'string.max': 'Company name cannot exceed 255 characters',
                'any.required': 'Company name is required'
            }),
        telefon: Joi.number().required()
            .messages({
                'number.base': 'Phone must be a number',
                'any.required': 'Phone is required'
            }),
        ceg_email: Joi.string().email().required()
            .messages({
                'string.base': 'Company email must be a text',
                'string.email': 'Company email must be a valid email address',
                'any.required': 'Company email is required'
            }),
        jelszo: Joi.string().min(6).required()
            .messages({
                'string.base': 'Password must be a text',
                'string.min': 'Password must be at least 6 characters long',
                'any.required': 'Password is required'
            }),
        telepules: Joi.string().required()
            .messages({
                'string.base': 'City must be a text',
                'any.required': 'City is required'
            }),
        megye: Joi.string().required()
            .messages({
                'string.base': 'County must be a text',
                'any.required': 'County is required'
            }),
        ceges_szamla: Joi.number().required()
            .messages({
                'number.base': 'Company account must be a number',
                'any.required': 'Company account is required'
            }),
        hitelkartya: Joi.number().required()
            .messages({
                'number.base': 'Credit card must be a number',
                'any.required': 'Credit card is required'
            }),
        adoszam: Joi.number().required()
            .messages({
                'number.base': 'Tax number must be a number',
                'any.required': 'Tax number is required'
            }),
        cegjegyzek: Joi.string().required()
            .messages({
                'string.base': 'Registration number must be a text',
                'any.required': 'Registration number is required'
            }),
        helyrajziszam: Joi.string().required()
            .messages({
                'string.base': 'Land registry number must be a text',
                'any.required': 'Land registry number is required'
            })
    });
    return schema.validate(company, { abortEarly: false });
};

module.exports = {
    userValidation,
    companyValidation
};
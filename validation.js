const Joi = require('joi');

const userValidation = (user) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(255).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(user);
};

const companyValidation = (company) => {
    const schema = Joi.object({
        cegnev: Joi.string().min(2).max(255).required(),
        telefon: Joi.number().required(),
        ceg_email: Joi.string().email().required(),
        jelszo: Joi.string().min(6).required(),
        telepules: Joi.string().required(),
        megye: Joi.string().required(),
        ceges_szamla: Joi.number().required(),
        hitelkartya: Joi.number().required(),
        adoszam: Joi.number().required(),
        cegjegyzek: Joi.string().required(),
        helyrajziszam: Joi.string().required()
    });
    return schema.validate(company);
};

module.exports = {
    userValidation,
    companyValidation
};
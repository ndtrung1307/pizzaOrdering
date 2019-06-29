
const Joi = require('@hapi/joi');

module.exports = {
    validate: {
        payload: {
            email: Joi.string().email({minDomainSegments: 2}).required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
        },
        payload_Signup: {
            email: Joi.string().email({minDomainSegments: 2}).required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
            phone: Joi.string().regex(/^[0-9]{10,13}$/).required(),
            firstname: Joi.string().required(),
            lastname: Joi.string().required()
        },
        payload_changePass: {
            oldpassword: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
            confirm: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
        },
        payload_UpdateUser: {
            phone: Joi.string().regex(/^[0-9]{10,13}$/),
            firstname: Joi.string(),
            lastname: Joi.string()
        },
    }
};
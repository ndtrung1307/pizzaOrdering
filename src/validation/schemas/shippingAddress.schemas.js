
const Joi = require('@hapi/joi');

module.exports = {
    validate: {
        payload_create: {
            houseNumber: Joi.string().required(),
            street: Joi.string().required(),
            dictrict: Joi.string().required(),
            province: Joi.string().required(),
            informationGuider: Joi.string().allow('', null)
        },
        payload_update: Joi.object().keys({
            houseNumber: Joi.string(),
            street: Joi.string(),
            dictrict: Joi.string(),
            province: Joi.string(),
            informationGuider: Joi.string().allow('', null)
        })
    }
};
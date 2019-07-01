var Joi = require('@hapi/joi');

Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
    objectId: {
        id: Joi.objectId().required()
    },
    TOKENValidate: Joi.object({
        'authorization': Joi.string().required()
    }).description(
        'Need a TOKEN to authenticate before you can do this action!!!'
    ).options({
        allowUnknown: true
    })
};
var Joi = require('@hapi/joi');

Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
    objectId: {
        id: Joi.objectId().required()
    }
};
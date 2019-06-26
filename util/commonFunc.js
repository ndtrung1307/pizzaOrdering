
const mongoose = require('mongoose');
const Boom = require('@hapi/boom');

module.exports.errorHandler = (err, h) => {
    
    console.error(err);
    
    if (err instanceof mongoose.Error.CastError) {
        return Boom.badRequest('Invalid ID or Querry Params');
    }

    if (err.isBoom) {
        return h.response(err.output.payload).code(err.output.statusCode);
    }

    if (err.name === 'MongoError'){
        switch (err.code) {
            case 11000:
                return Boom.conflict('Maybe new data conflict with another resource');
        
            default:
                break;
        }
    }
};

module.exports.throwIfMissing = (val, Error) => {

    if (val === null || val === undefined) {
        throw Error;
    }
};

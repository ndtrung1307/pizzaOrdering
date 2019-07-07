const Boom = require('@hapi/boom');
const userModel = require('../../models/user.model');
const authService = require('../../services/auth.service');
const commonFunctions = require('../../util/commonFunc');

exports.login = async (req, h) => {
    let email = req.payload.email.toLowerCase();
    try {
        let user = await userModel.findOne({
            email: email
        });
        
        if (!user) {
            throw Boom.badRequest('This email is unvalid');
        }
        
        if (!user.comparePassword(req.payload.password)) {
            throw Boom.badRequest('Password or email is not correct');
        }
        
        let token = await authService.createToken(user);
        return h.response({
            JWT: token
        }).code(201);
    } catch (error) {
        return commonFunctions.errorHandler(error, h);
    }
};
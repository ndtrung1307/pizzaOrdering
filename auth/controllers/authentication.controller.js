const Boom = require('@hapi/boom');
const userModel = require('../../models/user.model');
const authService = require('../../services/auth.service');
const userDTO = require('../../models/DTO/user.DTO');
const commonFunctions = require('../../util/commonFunc');

exports.login = async (req, h) => {
    try {
        let user = await userModel.findOne({
            email: req.payload.email
        });
        
        if (!user) {
            throw Boom.badRequest('This email is unvalid');
        }
        
        if (!user.comparePassword(req.payload.password)) {
            throw Boom.badRequest('Password or email is not correct');
        }
        
        let token = await authService.createToken(user);
        return h.response({
            JWT: token,
            userData: userDTO.convertReturnUserProfileDTO(user)
        }).code(201);
    } catch (error) {
        return commonFunctions.errorHandler(error, h);

    }
};
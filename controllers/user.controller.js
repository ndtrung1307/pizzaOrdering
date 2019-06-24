const user = require('../models/user.model');
// const authService = require('../services/auth.service');
const userService = require('../services/user.service');
const Boom = require('@hapi/boom');

/**
 * Register a User Account
 */
exports.register = async (req, h) => {

    let userdata = {
        email: req.payload.email,
        password: req.payload.password,
        phone: req.payload.phone,
        firstname: req.payload.firstname,
        lastname: req.payload.lastname
    };

    try {
        let user = await userService.signUp(userdata);
        if (user) {
            return h.response('Create user successfully!').code(201);
        }
        return h.response('Create user faillue!').code(500);
    } catch (error) {
        return h.response(Boom.internal());
    }
};
exports.getUser = async (req, h) => {
    let user;
    try {
        switch (req.auth.credentials.role) {
            case 'USER':
                
                let id = req.auth.credentials._id;
                user = await userService.getOneUser(id);
                return h.response(user).code(201);
            case 'ADMIN':
                user = await userService.getAllUser();
                return h.response(user).code(201);

            default:
                break;
        }
    } catch (error) {
        h.response(Boom.internal());
    }
};

exports.getOneUser = async (req, h) => {
    try {
        let id = req.params.id;
        let user = await userService.getOneUser(id);
        return h.response(user).code(201);
    } catch (error) {
        h.response(Boom.internal());
    }
};

exports.UpdatePassword = async (req, h) => {
    try {
        let data = req.payload;
        let isUpdated,id;
        switch (req.auth.credentials.role) {
            case 'USER':
                
                id = req.auth.credentials._id;
                isUpdated = await userService.updatePassword(id, data);
                break;

            case 'ADMIN':

                id = req.params.id !== undefined ? req.params.id : req.auth.credentials._id;
                isUpdated = await userService.updatePassword(id, data);
                break;

            default:
                break;
        }
        return isUpdated ? h.response('updateSuccess').code(201) : h.response('update failue').code(500);
    } catch (error) {
        h.response(Boom.internal());
    }
};

exports.deleteById = async (req, h) => {
    try {
        let id = req.params.id;
        await userService.deleteOneUserAsAdmin(id);
        return h.response({
            msg: `User has been deleted with id ${req.params.id}`
        }).code(201);
    } catch (error) {
        h.response(Boom.internal());
    }
};

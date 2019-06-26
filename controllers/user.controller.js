const userService = require('../services/user.service');
const commonFunctions = require('../util/commonFunc');
const constans = require('../util/constants');


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
        return commonFunctions.errorHandler(error, h);
    }
};
exports.getUser = async (req, h) => {
    let user;
    try {
        switch (req.auth.credentials.role) {
            case 'USER':
                
                let id = req.auth.credentials._id;
                user = await userService.getOneUser(id);
                if (user) {
                    return h.response(user).code(201);
                }
                return constans.boomMessage.invalidIDOrQueryParams;
            case 'ADMIN':
                user = await userService.getAllUser();
                return h.response(user).code(201);

            default:
                break;
        }
    } catch (error) {
        return commonFunctions.errorHandler(error, h);
    }
};

exports.getOneUser = async (req, h) => {
    try {
        let id = req.params.id;
        let user = await userService.getOneUser(id);
        if (user) {
            return h.response(user).code(201);
        }
        return constans.boomMessage.invalidIDOrQueryParams;
    } catch (error) {
        return commonFunctions.errorHandler(error, h);
    }
};

exports.updateUser = async (req,h) => {
    try {
        let data = req.payload;
        let id = req.auth.credentials._id;
        let res = await userService.update(id, data);
        if (res) {
            return h.response({
                msg: `User has been updated with id ${res._id}`
            }).code(201);
        }
        return h.response({
            msg: `Cannot update product with id ${id}`
        }).code(500);
    } catch (error) {
        return commonFunctions.errorHandler(error, h);
    }
};
exports.updateUserByID = async (req, h) => {
    try {
        let data = req.payload;
        let id = req.params.id;
        let res = await userService.update(id, data);
        if (res) {
            return h.response({
                msg: `User has been updated with id ${res._id}`
            }).code(201);
        }
        return h.response({
            msg: `Cannot update product with id ${id}`
        }).code(500);
    } catch (error) {
        return commonFunctions.errorHandler(error, h);
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
        return commonFunctions.errorHandler(error, h);
    }
};

exports.deleteById = async (req, h) => {
    try {
        let id = req.params.id;
        let res = await userService.deleteOneUserAsAdmin(id);
        if (res) {
            return h.response({
                msg: `User has been deleted with id ${req.params.id}`
            }).code(201);
        }
        return constans.boomMessage.invalidIDOrQueryParamsOrDeleted;
    } catch (error) {
        return commonFunctions.errorHandler(error, h);
    }
};

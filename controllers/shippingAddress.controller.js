const shippingAddressService = require('../services/shippingAddress.service');
const commonFunctions = require('../util/commonFunc');
const constans = require('../util/constants');


exports.create = async (req, h) => {

    let addressdata = {
        user: req.auth.credentials._id,
        houseNumber: req.payload.houseNumber,
        street: req.payload.street,
        dictrict: req.payload.dictrict,
        province: req.payload.province,
        informationGuider: req.payload.informationGuider
    };
    
    try {
        let address = await shippingAddressService.create(addressdata);
        if (address) {
            return h.response('Create new shipping address successfully!').code(201);
        }
        return h.response('Create shipping address faillue!').code(500);
    } catch (error) {
        return commonFunctions.errorHandler(error, h);
    }
};
exports.getAddress = async (req, h) => {
    let address;
    let size = req.query.size === undefined ? constans.SHIPPINGADDRESS.DEFAUT_SIZE : req.query.size;
    let page = req.query.page === undefined ? constans.SHIPPINGADDRESS.DEFAUT_PAGE : req.query.page;

    try {
        switch (req.auth.credentials.role) {
            case 'USER':

                let id = req.auth.credentials._id;
                address = await shippingAddressService.getAllAddressOfUser(id, size, page);
                if (address) {
                    return h.response(address).code(201);
                }
                return constans.boomMessage.invalidIDOrQueryParams;
            case 'ADMIN':
                address = await shippingAddressService.getAll(size, page);
                return h.response(address).code(201);

            default:
                break;
        }
    } catch (error) {
        return commonFunctions.errorHandler(error, h);
    }
};

exports.getOneAddress = async (req, h) => {
    try {
        let id = req.params.id;
        let userId = req.auth.credentials._id;
        let address = await shippingAddressService.getOneAddress(id,userId);
        if (address) {
            return h.response(address).code(201);
        }
        return constans.boomMessage.invalidIDOrQueryParams;
    } catch (error) {
        return commonFunctions.errorHandler(error, h);
    }
};

exports.updateAddress = async (req, h) => {
    try {
        let data = req.payload;
        let userId = req.auth.credentials._id;
        let id = req.params.id;
        let res = await shippingAddressService.updateAddress(id, userId, data);
        if (res) {
            return h.response({
                msg: `Address has been updated with id ${res._id}`
            }).code(201);
        }
        return h.response({
            msg: `Cannot update Address with id ${id}`
        }).code(500);
    } catch (error) {
        return commonFunctions.errorHandler(error, h);
    }
};

exports.deleteById = async (req, h) => {
    try {
        let id = req.params.id;
        let userId = req.auth.credentials._id;
        let res = await shippingAddressService.deleteOneAddress(id,userId);
        if (res) {
            return h.response({
                msg: `Address has been deleted with id ${req.params.id}`
            }).code(201);
        }
        return constans.boomMessage.invalidIDOrQueryParamsOrDeleted;
    } catch (error) {
        return commonFunctions.errorHandler(error, h);
    }
};

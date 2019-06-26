const pizzaOptionService = require('../services/pizzaOption.service');
const commonFunctions = require('../util/commonFunc');
const constans = require('../util/constants');

/**
 * Register a User Account
 */
exports.create = async (req, h) => {

    let pizzaOptiondata = {
        name: req.payload.name,
        type: req.payload.type,
        price: req.payload.price
    };
    try {
        return pizzaOptionService.create(pizzaOptiondata).then((result) => {
            if (result !== undefined) {
                return h.response({
                    Message: 'Create pizza option successfully!',
                    OptionInfo: result
                }).code(201);
            }
            return h.response('Create category faillue!').code(500);
        });

    } catch (error) {
        return commonFunctions.errorHandler(error, h);
    }
};
exports.getPizzaOptions = async (req, h) => {
    try {
        let options = await pizzaOptionService.getAll();
        return h.response(options).code(201);
    } catch (error) {
        return commonFunctions.errorHandler(error, h);
    }
};

exports.getOnePizzaOption = async (req, h) => {
    try {
        let id = req.params.id;
        let pizzaOption = await pizzaOptionService.getOnePizzaOptions(id);
        if(pizzaOption) {
            return h.response(pizzaOption).code(201);
        }
        return constans.boomMessage.invalidIDOrQueryParams;
    } catch (error) {
        return commonFunctions.errorHandler(error, h);
    }
};

exports.updatePizzaOption = async (req, h) => {
    try {
        let data = req.payload;
        let id = req.params.id;
        let res = await pizzaOptionService.updatePizzaOption(id, data);
        if (res) {
            return h.response({
                msg: `Pizza Option has been updated with id ${res._id}`
            }).code(201);
        }
        return h.response({
            msg: `Cannot update Pizza Option with id ${id}`
        }).code(500);
    } catch (error) {
        return commonFunctions.errorHandler(error, h);
    }
};

exports.deleteOnePizzaOption = async (req, h) => {
    try {
        let id = req.params.id;
        let res = await pizzaOptionService.deleteOnePizzaOptionAsAdmin(id);
        if (res) {
            return h.response({
                msg: `Pizza option has been deleted with id ${req.params.id}`
            }).code(201);
        }
        return constans.boomMessage.invalidIDOrQueryParamsOrDeleted;
    } catch (error) {
        return commonFunctions.errorHandler(error, h);
    }
};

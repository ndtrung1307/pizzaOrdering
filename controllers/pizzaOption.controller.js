const pizzaOptionService = require('../services/pizzaOption.service');
const Boom = require('@hapi/boom');

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
        return h.response(Boom.internal());
    }
};
exports.getPizzaOptions = async (req, h) => {
    try {
        let options = await pizzaOptionService.getAll();
        return h.response(options).code(201);
    } catch (error) {
        h.response(Boom.internal());
    }
};

exports.getOnePizzaOption = async (req, h) => {
    try {
        let id = req.params.id;
        let pizzaOption = await pizzaOptionService.getOnePizzaOptions(id);
        if (Boom.isBoom(pizzaOption)) {
            h.response(Boom.internal());
        }
        return h.response(pizzaOption).code(201);
    } catch (error) {
        h.response(Boom.internal());
    }
};

// exports.UpdatePassword = async (req, h) => {
//     try {
//         let data = req.payload;
//         let isUpdated, id;
//         switch (req.auth.credentials.role) {
//             case 'USER':

//                 id = req.auth.credentials._id;
//                 isUpdated = await userService.updatePassword(id, data);
//                 break;

//             case 'ADMIN':

//                 id = req.params.id !== undefined ? req.params.id : req.auth.credentials._id;
//                 isUpdated = await userService.updatePassword(id, data);
//                 break;

//             default:
//                 break;
//         }
//         return isUpdated ? h.response('updateSuccess').code(201) : h.response('update failue').code(500);
//     } catch (error) {
//         h.response(Boom.internal());
//     }
// };

exports.deleteOnePizzaOption = async (req, h) => {
    try {
        let id = req.params.id;
        await pizzaOptionService.deleteOnePizzaOptionAsAdmin(id);
        return h.response({
            msg: `Pizza Option has been deleted with id ${id}`
        }).code(201);
    } catch (error) {
        h.response(Boom.internal());
    }
};

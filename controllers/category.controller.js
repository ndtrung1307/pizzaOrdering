const categoryService = require('../services/category.service');
const productService = require('../services/product.service');
const Boom = require('@hapi/boom');

/**
 * Register a User Account
 */
exports.create = async (req, h) => {
    
    let categorydata = {
        name: req.payload.name
    };
    try {
        let category = await categoryService.create(categorydata);
        if (category) {
            return h.response('Create category successfully!').code(201);
        }
        return h.response('Create category faillue!').code(500);
    } catch (error) {
        return h.response(Boom.internal());
    }
};
exports.getCategory = async (req, h) => {
    try {
        let categories = await categoryService.getAll();
        return h.response(categories).code(201);
    } catch (error) {
        h.response(Boom.internal());
    }
};

exports.getOneCategory = async (req, h) => {
    try {
        let id = req.params.id;
        let category = await categoryService.getOneCategory(id);
        return h.response(category).code(201);
    } catch (error) {
        h.response(Boom.internal());
    }
};

exports.getProductBaseOnCategory = async (req, h) => {
    try {
        let categoryName = req.params.categoryname;
        let category = await categoryService.getCategoryByName(categoryName);
        let products = await productService.getProductBaseOnCategory(category._id);
        return h.response(products).code(201);
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

exports.deleteOneCategory = async (req, h) => {
    try {
        let id = req.params.id;
        await categoryService.deleteOneCategoryAsAdmin(id);
        return h.response({
            msg: `Category has been deleted with id ${req.params.id}`
        }).code(201);
    } catch (error) {
        h.response(Boom.internal());
    }
};

const bcrypt = require('bcrypt');
const Boom = require('@hapi/boom');
const categoryModel = require('../models/category.model');

// const generateUserID = function () {
//     return Math.random().toString(36).substring(2, 15);
// };


module.exports = {
    create: async (data) => {
        const category = await categoryModel.findOne({
            name: data.name
        });
        if (category) {
            throw Boom.conflict('Category already exists!');
        }

        let cate = await categoryModel(data).save();

        let returnData = {
            _id: cate._id,
            name: cate.name
        };
        return returnData;
    },
    getAll: async () => {
        let categories = await categoryModel.find({});
        return categories;
    },

    getOneCategory: async (id) => {

        let category = await categoryModel.findById(id);
        return category;
    },

    getCategoryByName: async (name) => {

        let category = await categoryModel.find({name: name});
        return category[0];
    },

    // updatePassword: async (id, data) => {
    //     try {
    //         let item = await userModel.findById(id);
    //         if (!item) throw Boom.notFound();

    //         if (!item.comparePassword(data.oldpassword)) {
    //             return false;
    //         }
    //         item.password = data.password;
    //         let res = await item.save();
    //         if (res) {
    //             return true;
    //         }
    //         return false;
    //     } catch (error) {
    //         throw error;
    //     }
    // },

    deleteOneCategoryAsAdmin: async (id) => {
        try {
            await categoryModel.findByIdAndDelete(id);
        } catch (error) {
            return err;
        }
    }
};
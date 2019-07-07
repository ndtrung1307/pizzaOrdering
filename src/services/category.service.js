const Boom = require('@hapi/boom');
const categoryModel = require('../models/category.model');


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
                
        let category = await categoryModel.find({
            name: name
        });

        return category[0];
    },

    update: async (id,data) => {
        let result = await categoryModel.findByIdAndUpdate(id, data);
        return result;
    },

    deleteOneCategoryAsAdmin: async (id) => {
        let res = await categoryModel.findByIdAndDelete(id);
        return res;
    }
};
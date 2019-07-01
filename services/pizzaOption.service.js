const Boom = require('@hapi/boom');
const pizzaOptionModel = require('../models/pizzaOptions.model');
const pizzaOptionDTO = require('../models/DTO/pizzaOption.DTO');

module.exports = {
    create: async (data) => {
        const pizzaOption = await pizzaOptionModel.findOne({
            name: data.name
        });
        if (pizzaOption) {
            throw Boom.conflict('Pizza option already exists!');
        }

        return pizzaOptionModel(data).save().then((result) => {
            if (result) return ({
                id: result._id,
                name: result.name
            });
        });
    },
    getAll: () => {
        return pizzaOptionModel.find({}).then((result) => {
            if (result) {
                return result;
            }
        });
    },

    getOnePizzaOptions: async (id) => {
        let pizzaOption = await pizzaOptionModel.findById(id);
        return pizzaOption === null ? null : pizzaOptionDTO.convertReturnPizzaOptionDTO(pizzaOption);
    },

    getListSimplePizzaOptions: async Ids => {
        let pizzaOptions = await pizzaOptionModel.find({
            _id: {
                $in: Ids
            }
        });
        return pizzaOptions === null ? null : pizzaOptionDTO.convertListOfReturnPizzaOptionDTOforOrder(pizzaOptions);
    },

    updatePizzaOption: async (id, data) => {
        let result = await pizzaOptionModel.findByIdAndUpdate(id, data);
        return result;
    },

    deleteOnePizzaOptionAsAdmin: async (id) => {
        let res = await pizzaOptionModel.findByIdAndDelete(id);
        return res;
    }
};
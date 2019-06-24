const Boom = require('@hapi/boom');
const pizzaOptionModel = require('../models/pizzaOptions.model');


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
        }).catch((error) => {
            if (error) throw Boom.badData('Bad Data', Error);
        });
    },
    getAll: () => {
        return pizzaOptionModel.find({}).then((result) => {
            if(result) {
                return result;
            }
        }).catch((error) => {
            throw Boom.internal('',Error);
        });
    },

    getOnePizzaOptions: async (id) => {
        try {
            let pizzaOption = await pizzaOptionModel.findById(id);
            // console.log(pizzaOption);
            // if (pizzaOption === null) {
            //     return Boom.notFound('Not found!!!');
            // }
            return pizzaOption;
        } catch (error) {
            throw Boom.internal('', Error);
        }
    },

    getPizzaOptionsByNames: async (names) => {

        let returnData = {
            toppings: [],
            crustoptions:[]
        };
        try {
            await names.forEach(name => {
                pizzaOptionModel.find({
                    name: name
                }).then((result) =>{                    
                    switch (result[0].type) {
                        case 'topping':
                            returnData.toppings.push(result[0]);
                            break;
                        case 'crust':
                            returnData.crustoptions.push(result[0]);
                            break;
                        default:
                            break;
                    }
                });
            });
            return returnData;            
        } catch (error) {
            throw Boom.internal('', Error);
        }
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

    deleteOnePizzaOptionAsAdmin: async (id) => {
        try {
            await pizzaOptionModel.findByIdAndDelete(id);
        } catch (error) {
            return err;
        }
    }
};
module.exports = {
    convertReturnPizzaOptionDTO: (pizzaOptionData) => {
        return {
            _id: pizzaOptionData._id,
            name: pizzaOptionData.name,
            type: pizzaOptionData.type,
            price: pizzaOptionData.price
        };
    },
    convertListOfReturnPizzaOptionDTOforOrder: (pizzaOptionData) => {
        return pizzaOptionData.map(x => ({
            name: x.name,
            price: x.price
        }));
    }
};
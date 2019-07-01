const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var pizzaOptionSchema = new Schema({
     name: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    type: {
        type:String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});


module.exports = mongoose.model('PizzaOption', pizzaOptionSchema);
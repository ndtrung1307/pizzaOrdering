const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    description: {
        type: String
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    picture: {
        type: String
    },
    prices: [{
        size: {
            type: String,
        },
        price: {
            type: Number,
        }
    }],
    wrapper: [String],
    options: [{
        type: Schema.Types.ObjectId,
        ref: 'PizzaOption'
    }]
});



module.exports = mongoose.model('Product', productSchema);
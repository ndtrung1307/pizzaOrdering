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
        type: String,
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
    options: {
        toppings: [{
            name: {
                type: String,
            },
            price: {
                type: Number,
            }
        }],
        crustoptions: [{
            name: {
                type: String,
            },
            price: {
                type: Number,
            }
        }]
    }
});

module.exports = mongoose.model('Product', productSchema);
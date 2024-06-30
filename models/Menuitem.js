const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');

const menuItemsSchema = new mongoose.Schema({ 
    name: { 
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    taste: {
        type: String,
        enum: ['sweet','spicy','sour'],
        required: true
    },
    is_drink: {
        type: String,
        default: false
    },
    ingredients: {
        type: [String],
        default: []
    }

})

const Menuitems =  mongoose.model('Menuitems', menuItemsSchema);

// comment added for the testing purpose
module.exports = Menuitems;

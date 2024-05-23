const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User',
    },
    name: {
        type: String,
        require: true,
    },
    brand: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
        default: 0,
    },
    availableForSale: {
        type: Boolean,
        default: false,
    },
})

module.exports = mongoose.model('Product', productSchema);
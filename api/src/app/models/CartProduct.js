const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartProduct = new Schema(
    {
        product: { type: Schema.Types.ObjectId, ref: 'products', required: true },
        customer: {type: Schema.Types.ObjectId, ref: 'Customer', required: true},
        quantity: { type: Number, required: true, default: 1, min: 1, max: 5}
    }
)

module.exports = mongoose.model('cart_products', CartProduct);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerProductFavorite = new Schema(
    {
        customer: { type: Schema.Types.ObjectId, ref: 'customers', required: true, unique: true },
        products: [{ type: Schema.Types.ObjectId, ref: 'products' }],
    }
)

module.exports = mongoose.model('customer_product_favorites', CustomerProductFavorite);
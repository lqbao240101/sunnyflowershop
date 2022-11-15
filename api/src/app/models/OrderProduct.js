const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDateFormat = require('mongoose-date-format');

const OrderProduct = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'products', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    percent_sale: { type: Number, default: 0 }
}, {
    timestamps: true
}
)

OrderProduct.plugin(mongooseDateFormat);
module.exports = mongoose.model('OrderProducts', OrderProduct);

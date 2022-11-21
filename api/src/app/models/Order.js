const mongoose = require('mongoose');
const Schema = mongoose.Schema; const mongooseDateFormat = require('mongoose-date-format');

const Order = new Schema(
    {
        customer: { type: Schema.Types.ObjectId,  ref: 'customers'},
        voucher: { type: Schema.Types.ObjectId, ref: 'vouchers', default: null },
        id_delivery: { type: String, required: true },
        date_order: { type: Date, default: Date.now },
        order_products: [{ type: Schema.Types.ObjectId, ref: 'OrderProducts' }],
        address: { type: String, required: true },
        name_receiver: { type: String, required: true },
        phone_receiver: { type: String, required: true },
        total_price: { type: Number, required: true },
        status: { type: Number, default: 0 },
        deleted_by: { type: Number, default: null }
    }, {
    timestamps: true
}
)

Order.plugin(mongooseDateFormat);
module.exports = mongoose.model('orders', Order);
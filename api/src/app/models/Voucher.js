const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const mongooseDateFormat = require('mongoose-date-format');
const Schema = mongoose.Schema;

const Voucher = new Schema(
    {
        name: { type: String, required: true, minLength: 2, unique: true },
        usage: { type: Number, min: 5, required: true },
        percent: { type: Number, min: 0, max: 100, required: true },
        show: { type: Boolean, default: false},
        effective_date: { type: Date },
        expired_date: { type: Date, required: true },
    },
    {
        timestamps: true,
    },
)

Voucher.index({show: 1}, {unique: true, partialFilterExpression: {show: true}})
Voucher.plugin(mongooseDelete, { overrideMethods: 'all' })
Voucher.plugin(mongooseDateFormat);
module.exports = mongoose.model('vouchers', Voucher);
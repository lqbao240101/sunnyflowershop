const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');
const mongooseDateFormat = require('mongoose-date-format');

const Customer = new Schema(
    {
        first_name: { type: String, min: 2, max: 50, required: true },
        last_name: { type: String, min: 2, max: 50, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, min: 6, max: 24, required: true },
        avatar: { type: String, required: true },
        addresses : [{ type: Schema.Types.ObjectId, ref: 'addresses' }],
    },{
        timestamps: true,
    },
)

Customer.plugin(mongooseDelete, { overrideMethods: 'all' })
Customer.plugin(mongooseDateFormat);
module.exports = mongoose.model('customers', Customer);
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const Customer = new Schema(
    {
        _id: { type: Number },
        first_name: { type: String, min: 2, max: 50, required: true },
        last_name: { type: String, min: 2, max: 50, required: true },
        email: { type: String, required: true },
        password: { type: String, min: 6, max: 24, required: true },
        avatar: { type: String, default: null },
    },
    {
        _id: false
    });

Customer.plugin(AutoIncrement, {id: 'customer_id_counter', inc_field: '_id'});
module.exports = mongoose.model('customers', Customer);
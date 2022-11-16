const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Address = new Schema(
    {
        first_name_receiver: { type: String, min: 2, max: 100, required: true },
        last_name_receiver: { type: String, min: 2, max: 100, required: true },
        customer: { type: Schema.Types.ObjectId,  ref: 'Customer', required: true},
        phone_receiver: { type: String, min: 8, required: true },
        street_name: { type: String, min: 2, required: true },
        district: { type: String, required: true },
        ward: { type: String, required: true },
        city: { type: String, required: true },
    }
)

module.exports = mongoose.model('addresses', Address);
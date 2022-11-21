const mongoose = require('mongoose');
const Schema = mongoose.Schema; const mongooseDateFormat = require('mongoose-date-format');

const Feedback = new Schema(
    {
        customer: { type: Schema.Types.ObjectId, ref: 'customers', required: true },
        product: { type: Schema.Types.ObjectId, ref: 'products', required: true },
        comment: { type: String, required: true, minLength: 1, maxLength: 100 }
    }, {
    timestamps: true
}
)

Feedback.plugin(mongooseDateFormat);
module.exports = mongoose.model('feedbacks', Feedback);
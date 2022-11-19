const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const mongooseDateFormat = require('mongoose-date-format');

const Schema = mongoose.Schema;

const Product = new Schema(
    {
        name: { type: String, required: true, minLength: 2, maxLength: 100, unique: true },
        description: { type: String, required: true, minLength: 10 },
        price: { type: Number, required: true },
        percent_sale: { type: Number, required: true, min: 0, max: 100 },
        category: { type: Schema.Types.ObjectId, ref: 'categories', required: true },
        img: { type: String, required: true },
        quantity: { type: Number, min: 0, required: true },
        status: { type: Number, min: 0, max: 1, default: 1, required: true },
    },{
        timestamps: true
    },
);

Product.plugin(mongooseDateFormat);
Product.plugin(mongooseDelete, { overrideMethods: 'all' })
module.exports = mongoose.model('products', Product);
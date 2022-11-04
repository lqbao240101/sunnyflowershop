const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const Product = new Schema(
    {
        _id: { type: Number },
        name: { type: String },
        description: { type: String },
        price: { type: Number },
        percent_sale: { type: Number },
        img: { type: String },
        quantity: { type: Number },
        status: { type: String }
    },
    {
        _id: false
    });

Product.plugin(AutoIncrement);
module.exports = mongoose.model('products', Product);
const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const mongooseDateFormat = require('mongoose-date-format');

const Schema = mongoose.Schema;

const Category = new Schema(
    {
        name: { type: String, required: true, minLength: 2, unique: true },
    },
    {
        timestamps: true,
    },
);

Category.plugin(mongooseDateFormat);
Category.plugin(mongooseDelete, { overrideMethods: 'all' })
module.exports = mongoose.model('categories', Category);
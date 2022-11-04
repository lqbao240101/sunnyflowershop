const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const Admin = new Schema(
    {
        _id: { type: Number },
        username: { type: String, min: 2, max: 50, required: true },
        email: { type: String, required: true },
        password: { type: String, min: 6, max: 24, required: true },
        level: { type: Number, default: 1 },
    },
    {
        _id: false
    });

Admin.plugin(AutoIncrement, { id: 'admin_id_counter', inc_field: '_id' });
module.exports = mongoose.model('admins', Admin);
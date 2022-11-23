const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');
const mongooseDateFormat = require('mongoose-date-format');

const Admin = new Schema(
    {
        username: { type: String, minLength: 2, maxLength: 50, required: true },
        email: { type: String, required: true },
        password: { type: String, minLength: 6, required: true },
        level: { type: Number, default: 1, min: 1, max: 2},
        avatar: { type: String, required: true}
    },{
        timestamps: true,
    },
)

Admin.plugin(mongooseDelete, { overrideMethods: 'all' })
Admin.plugin(mongooseDateFormat);
module.exports = mongoose.model('admins', Admin);
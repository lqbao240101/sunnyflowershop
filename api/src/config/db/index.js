const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://lqbao:lqbao240101@cluster0.2l7nv.mongodb.net/sunny_flower_shop', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connect successfully!!!');
    } catch (error) {
        console.log('Connect failure!!!');
    }
}

module.exports = { connect };
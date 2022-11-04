const productRouter = require('./products');
const customerRouter = require('./customer')

function routes(app) {
    app.use('/products', productRouter)
    app.use('/customer', customerRouter)
}

module.exports = routes;
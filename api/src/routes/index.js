const productRouter = require('./products');
const customerRouter = require('./customer');
const orderRouter = require('./order')
const categoryRouter = require('./category')
const addressRouter = require('./address')
const voucherRouter = require('./voucher')
const adminRouter = require('./admin')
const customerProductFavoriteRouter = require('./customerProductFavorite')
const cartProductRouter = require('./cartProduct')
const feedbackRouter = require('./feedback')

function routes(app) {
    app.use('/product', productRouter)
    app.use('/customer', customerRouter)
    app.use('/order', orderRouter)
    app.use('/category', categoryRouter)
    app.use('/address', addressRouter)
    app.use('/voucher', voucherRouter)
    app.use('/admin', adminRouter)
    app.use('/favorite', customerProductFavoriteRouter)
    app.use('/cart', cartProductRouter)
    app.use('/feedback', feedbackRouter)
}

module.exports = routes;
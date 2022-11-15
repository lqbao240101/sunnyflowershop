const Product = require('../models/Product')

class CheckCart {
    async checkCart(req, res, next) {
        let check = 0;
        const { listProducts } = req.body;
        const list = listProducts;

        if (list.length === 0) {
            check++;
            return res.json({
                success: false,
                message: "Your cart is empty."
            })
        }
        else {
            for (let i = 0; i < list.length; i++) {
                const product = await Product.findOne({
                    _id: list[i].product
                })

                if (!product) {
                    check++;
                    return res.json({
                        success: false,
                        message: `Product was deleted or product id not found.`
                    })
                } else {
                    if (product.quantity < list[i].quantity) {
                        check++;
                        return res.json({
                            success: false,
                            message: `Product has name: ${product.name} don't have enough quantity.`
                        })
                    }
                }

            }
        }

        if (check === 0) {
            next()
        }
    }
}

module.exports = new CheckCart();
const Product = require('../models/Product');

class ProductController {
    //[GET] /products => Show all products
    show(req, res, next) {
        Product.find({})
            .then(products => {
                res.json({
                    success: true,
                    data: products
                })
            })
            .catch(next);
    }

    // [GET] /products/:id
    detail(req, res, next) {
        Product.findById(req.params.id)
            .then((product) => {
                if (!product) {
                    return res.json({
                        success: false,
                        error: "Product does not exist!"
                    })
                }

                return res.json({
                    success: true,
                    data: product
                })
            }).catch(next)
    }

    // [POST] /products/store
    create(req, res, next) {
        const formData = req.body;
        formData.name = "Balo";
        const product = new Product(formData);
        product.save().then(() => {
            return res.json({
                success: "true",
                message: "Successfully created product"
            })
        }).catch(next)

    }
}

module.exports = new ProductController();
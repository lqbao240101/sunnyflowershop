const Product = require('../models/Product');
const CartProduct = require('../models/CartProduct')

class CustomerProductCarController {

    // show(req, res) {
    //     CustomerProductCart.findOne({ customer: req.user._id })
    //         .populate({
    //             path: 'cart_products',
    //             populate: {
    //                 path: 'products'}
    //         })
    //         .populate('products')
    //         // .populate('customer', 'email')
    //         .then(data => {
    //             res.json({
    //                 success: true,
    //                 data: data
    //             })
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             res.json({
    //                 success: false
    //             })
    //         });
    // }

    // [GET] /cart/
    show(req, res) {
        CartProduct.find({ customer: req.user._id })
            .populate({
                path: 'product', options: { withDeleted: true }
            })
            .then(data => {
                res.json({
                    success: true,
                    data: data
                })
            })
            .catch(err => {
                console.log(err);
                res.json({
                    success: false
                })
            });
    }


    // [PATCH] /cart/:id
    add(req, res) {
        const { quantity } = req.body;
        let quanTiTy = Number(quantity);

        if (quanTiTy > 5) {
            quanTiTy = 5;
        }

        Product.findOne({
            _id: req.params.id
        })
            .then(product => {
                if (product) {
                    CartProduct.findOne({
                        customer: req.user._id,
                        product: product._id
                    })
                        .then(data => {
                            if (!data) {
                                CartProduct.create({
                                    customer: req.user._id,
                                    product: req.params.id,
                                    quantity: quanTiTy
                                })
                                    .then(product => {
                                        res.json({
                                            success: true,
                                            message: "Add product to cart successfully"
                                        })
                                    })
                                    .catch(err => {
                                        console.log(err)
                                        res.json({
                                            success: false,
                                            message: "Fai 2"
                                        })
                                    })
                            } else {
                                data.quantity = data.quantity + quanTiTy;

                                if (data.quantity > 5) {
                                    data.quantity = 5;
                                }

                                data.save()
                                    .then(result => {
                                        res.json({
                                            success: true,
                                            message: "Add product to cart successfully"
                                        })
                                    })
                                    .catch(err => {
                                        console.log(err)
                                        res.json({
                                            success: false,
                                            message: "Fail"
                                        })
                                    })
                            }
                        })
                        .catch(err => {
                            res.json({
                                success: false,
                                message: "Product id not found"
                            })
                        })
                }
            })
            .catch(err => {
                res.json({
                    success: false,
                    message: "Product is not found."
                })
            })
    }

    //[DELETE] /cart/:id
    remove(req, res) {
        CartProduct.findOneAndDelete({
            customer: req.user._id,
            product: req.params.id
        })
            .then(result => {
                res.json({
                    success: true,
                    message: "Product removed from cart successfully"
                })
            })
            .catch(err => {
                res.json({
                    success: false,
                    message: "Product id not found"
                })
            })
    }

    // [PATCH] /cart/:id/updateQuantity
    updateQuantity(req, res) {
        let quantity = req.body.quantity;

        if (quantity <= 0) {
            quantity = 1
        }
        CartProduct.findOne({
            customer: req.user._id,
            product: req.params.id
        })
            .then(result => {
                result.quantity = quantity;
                result.save()
                    .then(savedData => {
                        res.json({
                            success: true,
                            message: "Update quantity of product successfully"
                        })
                    })
                    .catch(err => {
                        res.json({
                            success: false,
                            message: "Update quantity of product failed."
                        })
                    })
            })
            .catch(err => {
                res.json({
                    success: false,
                    message: "Product id not found"
                })
            })
    }

    // [GET] /cart/clearCart
    clearCart(req, res) {
        CartProduct.deleteMany({ customer: req.user._id })
            .then(result => {
                res.json({
                    success: true,
                    message: "Clear cart successfully."
                })
            })
            .catch(err => {
                res.json({
                    success: false,
                    message: "Customer id not found"
                })
            })
    }
}

module.exports = new CustomerProductCarController();
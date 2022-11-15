const Product = require('../models/Product');
const Category = require('../models/Category')

class ProductController {
    // [GET] /product => Show all products
    show(req, res) {
        Product.find({})
            .then(products => {
                res.json({
                    success: true,
                    data: products
                })
            })
            .catch(err => {
                res.json({
                    success: false
                })
            });
    }

    // [GET] /product/trashProduct => Show all deleted products
    trashProduct(req, res) {
        Product.findDeleted({})
            .then(products => {
                res.json({
                    success: true,
                    data: products
                })
            })
            .catch(err => {
                console.log(err)
                res.json({
                    success: false,
                })
            })
    }

    // [GET] /product/:id
    detail(req, res) {
        Product.findById(req.params.id)
            // .populate('categories', '-createdAt')
            .populate('categories', 'name -_id')
            .then(product => {
                res.json({
                    success: true,
                    data: product
                })
            })
            .catch(err => {
                res.json({
                    success: false,
                    message: "Product id not found"
                })
            })
    }

    // [POST] /products/ => Create product
    create(req, res) {
        const { name, categories, description, price, percentSale, img, quantity } = req.body;

        Product.findOneWithDeleted({ name: name })
            .then(data => {
                if (data) {
                    res.json({
                        success: false,
                        message: "Product name already exists."
                    })
                } else {
                    Product.create({
                        name: name,
                        description: description,
                        price: price,
                        percent_sale: percentSale,
                        img: img,
                        quantity: quantity,
                        categories: categories
                    })
                        .then(result => {
                            res.json({
                                success: true,
                                message: "Create product successfully"
                            })
                        })
                        .catch(err => {
                            res.json({
                                success: false,
                                message: "Invalid information"
                            })
                        })
                }
            })
            .catch(err => {
                res.json({
                    success: false,
                    message: "Something wrong"
                })
            })
    }

    //[POST] /products/:id/update
    update(req, res) {
        const { name, categories, description, price, percentSale, quantity } = req.body;

        let status = 0;
        let check = 0;

        if (quantity > 0) {
            status = 1;
        }


        Product.findById(req.params.id)
            .then(data => {
                for (let i = 0; i < data.categories; i++) {
                    if (categories[i] === data.categories[i].toString()) {
                        check++;
                        break;
                    }
                }

                if (!data) {
                    return res.json({
                        success: false,
                        message: "Product id not found or Product was deleted"
                    })
                }
                else {
                    if (name !== data.name) {
                        Product.findOneWithDeleted({ name: name })
                            .then(result => {
                                if (result) {
                                    res.json({
                                        success: false,
                                        message: "Product name already exists."
                                    })
                                } else {
                                    data.name = name;
                                    data.description = description;
                                    data.price = price;
                                    data.percent_sale = percentSale;
                                    data.quantity = quantity;
                                    data.categories = categories;
                                    data.status = status;

                                    data.save()
                                        .then(savedData => {
                                            res.json({
                                                success: true,
                                                message: "Update voucher successfully."
                                            })
                                        })
                                        .catch(err => {
                                            res.json({
                                                success: false,
                                                message: "Invalid information"
                                            })
                                        })
                                }
                            })
                            .catch(err => {
                                res.json({
                                    success: false,
                                    message: "Something wrong"
                                })
                            })
                    } else {
                        if (description == data.description
                            && percentSale == data.percent_sale
                            && price == data.price
                            && quantity == data.quantity
                            && check === 0
                        ) {
                            res.json({
                                success: false,
                                message: "You didn't change any product information."
                            })
                        } else {
                            data.name = name;
                            data.description = description;
                            data.price = price;
                            data.percent_sale = percentSale;
                            data.quantity = quantity;
                            data.categories = categories;
                            data.status = status;

                            data.save()
                                .then(savedData => {
                                    res.json({
                                        success: true,
                                        message: "Update product successfully."
                                    })
                                })
                                .catch(err => {
                                    res.json({
                                        success: false,
                                        message: "Invalid information"
                                    })
                                })
                        }
                    }
                }
            })
            .catch(err => {
                res.json({
                    success: false,
                    message: "Product id not found"
                })
            })
    }

    // [PATCH] /product/:id/updateImage
    updateImage(req, res) {
        const { img } = req.body;
        Product.findById(req.params.id)
            .then(data => {
                if (!data) {
                    return res.json({
                        success: false,
                        message: "Product id not found or Product was deleted"
                    })
                } else {
                    if (img === data.img) {
                        res.json({
                            success: false,
                            message: "You didn't change product image."
                        })
                    } else {
                        data.img = img;
                        data.save()
                            .then(result => {
                                res.json({
                                    success: true,
                                    message: "Update product image successfully."
                                })
                            })
                            .catch(err => {
                                res.json({
                                    success: false,
                                    message: "Invalid information"
                                })
                            })
                    }
                }
            })
            .catch(err => {
                res.json({
                    success: false,
                    message: "Product id not found"
                })
            })
    }


    // [DELETE] /product/:id
    delete(req, res) {
        Product.delete({ _id: req.params.id })
            .then(product => {
                res.json({
                    success: true,
                    message: "Delete product successfully"
                })
            })
            .catch(err => {
                res.json({
                    success: false,
                    message: "Product id not found"
                })
            })
    }

    // [PATCH] /product/:id/restore
    restore(req, res) {
        Product.restore({ _id: req.params.id })
            .then(result => {
                res.json({
                    success: true,
                    message: "Restore product successfully"
                })
            })
            .catch(err => {
                res.json({
                    success: false,
                    message: "Product id not found"
                })
            })
    }
}

module.exports = new ProductController();
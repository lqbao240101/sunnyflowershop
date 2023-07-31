const Product = require('../models/Product');
const Category = require('../models/Category')
const mongoose = require('mongoose');

class ProductController {

    // [GET] /product => Show all products
    show(req, res) {
        let perPage = 12;
        let page = parseInt(req.query.page);

        if (page < 1 || !page) {
            page = 1;
        }

        Product
            .find()
            .populate('category', 'name')
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec((err, products) => {
                Product.countDocuments((err, count) => {
                    if (err) return res.status(500).json({
                        error: err
                    });
                    res.status(200).json({
                        data: products,
                        meta: {
                            current_page: page,
                            last_page: Math.ceil(count / perPage),
                            total: count,
                        }
                    });
                });
            });
    }

    // [GET] /product/admin
    showAll(req, res) {
        let perPage = 12;
        let page = parseInt(req.query.page);

        if (page < 1 || !page) {
            page = 1;
        }

        Product
            .findWithDeleted()
            .populate('category', 'name')
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec((err, products) => {
                Product.countDocuments((err, count) => {
                    if (err) return next(err);
                    res.json({
                        data: products,
                        meta: {
                            current_page: page,
                            last_page: Math.ceil(count / perPage),
                            total: count,
                        }
                    });
                });
            });
    }

    // [GET] /product/:id
    detail(req, res) {
        Product.findById(req.params.id)
            // .populate('categories', '-createdAt')
            .populate('category', 'name')
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
            let x = 2;
    }

    // [POST] /products/ => Create product
    create(req, res) {
        const { name, category, description, price, percentSale, img, quantity } = req.body;
        let x = 2;
        Product.findOneWithDeleted({ name: name })
            .then(data => {
                let x = 3;
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
                        category: category
                    })
                        .then(result => {
                            res.json({
                                success: true,
                                message: "Create product successfully"
                            })
                        })
                        .catch(err => {
                            console.log(err);
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

    //[PUT] /products/:id/update
    update(req, res) {
        const { name, category, description, price, percentSale, quantity, img } = req.body;

        let status = 0;

        if (quantity > 0) {
            status = 1;
        }


        Product.findById(req.params.id)
            .then(data => {
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
                                    data.category = category;
                                    data.img = img;
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
                            && category == data.category
                            && img == data.img
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
                            data.category = category;
                            data.status = status;
                            data.img = img;

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

    // [POST] /customer/search
    search(req, res) {
        const { name, category, min, max } = req.body;
        let minPrice = 0;
        let maxPrice = 1000001;

        if (min) {
            minPrice = Number(min);
        }

        if (max) {
            maxPrice = Number(max);
        }

        if (category !== "") {
            Product.find(
                {
                    "$and": [
                        { name: new RegExp(name, 'i') },
                        { category: { "$in": category } },
                        { price: { "$gt": minPrice } },
                        { price: { "$lte": maxPrice } }
                    ]
                }
            )
                .then(data => {
                    res.json({
                        data: data
                    })
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            Product.find({
                "$and": [
                    { name: new RegExp(name, 'i') },
                    { price: { "$gt": minPrice } },
                    { price: { "$lte": maxPrice } }
                ]
            }
            )
                .then(data => {
                    res.json({
                        data: data
                    })
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    // [GET] /product/hotProducts
    hotProducts(req, res) {
        Product.find({})
            .sort({ createdAt: -1 })
            .limit(4)
            .exec((err, newArrival) => {
                if (err) return next(err);
                Product.find({
                    percent_sale: {
                        "$gt": 0
                    }
                })
                    .sort({ updatedAt: -1 })
                    .limit(4)
                    .exec((err, onSell) => {
                        if (err) return next(err);
                        res.json({
                            newArrival: newArrival,
                            onSell: onSell
                        })
                    })
            })
    }

}

module.exports = new ProductController();
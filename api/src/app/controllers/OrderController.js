const Order = require('../models/Order')
const OrderProduct = require('../models/OrderProduct');
const Product = require('../models/Product');
const orderid = require('order-id')('key');
const CartProduct = require('../models/CartProduct')
const Customer = require('../models/Customer')

class OrderController {

    // [GET] /order => Customer get all order || [GET /order/admin ] => Admin get detail order of customer
    show(req, res, next) {
        let perPage = 12;
        let page = parseInt(req.query.page);
        if (page < 1 || !page) {
            page = 1;
        }

        if (req.user) {
            Order
                .find({
                    customer: req.user._id
                })
                .populate('customer')
                .skip((perPage * page) - perPage)
                .limit(perPage)
                .exec((err, orders) => {
                    Order.countDocuments((err, count) => {
                        if (err) return next(err);
                        res.json({
                            data: orders,
                            meta: {
                                current_page: page,
                                last_page: Math.ceil(count / perPage),
                                total: count,
                            }
                        });
                    });
                });
        } else {
            Order
                .find()
                .populate('customer')
                .skip((perPage * page) - perPage)
                .limit(perPage)
                .exec((err, orders) => {
                    Order.countDocuments((err, count) => {
                        if (err) return next(err);
                        res.json({
                            data: orders,
                            meta: {
                                current_page: page,
                                last_page: Math.ceil(count / perPage),
                                total: count,
                            }
                        });
                    });
                });
        }
    }

    // [GET] /order/:id => Customer get detail order || [GET /order/:userId/:id] => Admin get detail order of customer
    detail(req, res) {
        Order.findOne({
            customer: req.user ? req.user._id : req.params.userId,
            _id: req.params.id
        })
            .populate('voucher', 'percent -_id')
            .populate({
                path: 'order_products',
                populate: { path: 'product' }
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
                    success: false,
                    message: "Order id or Customer id are not found."
                })
            })
    }

    // [POST] /order/
    create(req, res) {
        console.log('da chay')
        const { voucherId, address, nameReceiver, phoneReceiver, totalPrice } = req.body;
        const id_delivery = orderid.generate();
        const tempArr = [];

        let voucher = voucherId;
        if (voucherId === '') {
            voucher = null;
        }

        const list = req.list;

        Order.create({
            customer: req.user._id,
            voucher: voucher,
            id_delivery: id_delivery,
            address: address,
            order_products: tempArr,
            name_receiver: nameReceiver,
            phone_receiver: phoneReceiver,
            total_price: totalPrice
        })
            .then(data => {
                list.forEach(element => {
                    const orderProduct = new OrderProduct({
                        product: element.product._id,
                        quantity: element.quantity,
                        price: element.product.price,
                        percent_sale: element.product.percent_sale
                    });
                    tempArr.push(orderProduct._id);
                    orderProduct.save()
                        .then(result => {
                            Product.findOne({
                                _id: element.product
                            })
                                .then(data => {
                                    data.quantity = data.quantity - element.quantity;
                                    if (data.quantity === 0) {
                                        data.status = 0;
                                    }
                                    data.save()
                                        .then(savedData => {
                                        })
                                        .catch(err => {
                                            res.json({
                                                success: false,
                                                message: "Change quantity of product failed."
                                            })
                                        })
                                })
                                .catch(err => {
                                    res.json({
                                        success: false,
                                        message: "Product is not found"
                                    })
                                })
                        })
                        .catch(err => {
                            res.json({
                                success: false,
                                message: "Create order product failed."
                            })
                        })
                })

                data.order_products = tempArr;
                data.save()
                    .then(savedData => {
                        res.json({
                            success: true,
                            message: "Create order successfully."
                        })
                    })
                    .catch(err => {
                        res.json({
                            success: false,
                            message: "Create order failed"
                        })
                    })
            })
            .catch(err => {
                console.log(err)
                res.json({
                    success: false,
                    message: "Create order failed"
                })
            })


    }

    // [PATCH] /order/:id/:userId/cancel => Admin cancel order of customer || /order/:id/cancel => Customer cancel order
    cancel(req, res) {
        if (req.user) {
            Order.findOne({
                customer: req.user._id,
                _id: req.params.id
            })
                .then(data => {
                    data.deleted_by = 0;
                    data.save()
                        .then(savedData => {
                            res.json({
                                success: true,
                                message: "Cancel order successfully."
                            })
                        })
                        .catch(err => {
                            res.json({
                                success: false,
                                message: "Fail"
                            })
                        })
                })
                .catch(err => {
                    res.json({
                        success: false,
                        message: "Order id or Customer is not found."
                    });
                })
        } else {
            Order.findOne({
                customer: req.params.userId,
                _id: req.params.id
            })
                .then(data => {
                    data.deleted_by = 1;
                    data.save()
                        .then(savedData => {
                            res.json({
                                success: true,
                                message: "Cancel order successfully."
                            })
                        })
                        .catch(err => {
                            res.json({
                                success: false,
                                message: "Fail."
                            })
                        })
                })
                .catch(err => {
                    res.json({
                        success: false,
                        message: "Order id or Customer is not found."
                    });
                })
        }
    }

    // [PATCH] /order/:id/update
    update(req, res) {
        Order.findOne({
            customer: req.user._id,
            _id: req.params.id
        })
            .then(data => {
                if (data.deleted_by === null && data.status === 1) {
                    data.status = 2;
                    data.save()
                        .then(savedData => {
                            res.json({
                                success: true,
                                message: "Update status of order to 'Completed' successfully."
                            })
                        })
                        .catch(err => {
                            res.json({
                                success: false,
                                message: "Update status failed."
                            })
                        })
                } else if (data.deleted_by !== null) {
                    res.json({
                        success: false,
                        message: "This order was deleted."
                    })
                } else if (data.status === 0) {
                    res.json({
                        success: false,
                        message: "This order has not been processed yet"
                    })
                } else if (data.status === 2) {
                    res.json({
                        success: false,
                        message: "This order is having status 'Completed'."
                    })
                }
            })
            .catch(err => {
                res.json({
                    success: false,
                    message: "Order id is not found."
                })
            })
    }

    // [PATCH] /order/:id/:userId/updateStatus=:statusId
    updateStatus(req, res) {
        if (req.params.statusId == 1) {
            Order.findOne({
                customer: req.params.userId,
                _id: req.params.id
            })
                .then(data => {
                    if (data.status === 0 && data.deleted_by === null) {
                        data.status = 1;
                        data.save()
                            .then(savedData => {
                                res.json({
                                    success: true,
                                    message: "Update customer order status successfully."
                                })
                            })
                            .catch(err => {
                                res.json({
                                    success: false,
                                    messsage: "Failed"
                                })
                            })
                    } else if (data.status === 1) {
                        res.json({
                            success: false,
                            message: "This order is having status 'Confirmed'."
                        })
                    } else if (data.status === 2) {
                        res.json({
                            success: false,
                            message: "This order is having status 'Completed'."
                        })
                    } else if (data.deleted_by !== null) {
                        res.json({
                            success: false,
                            message: "This order was deleted."
                        })
                    }
                })
                .catch(err => {
                    res.json({
                        success: false,
                        message: "Customer id or order it is not found."
                    })
                })

        } else if (req.params.statusId == 2) {
            Order.findOne({
                customer: req.params.userId,
                _id: req.params.id
            })
                .then(data => {
                    if (data.status === 1 && data.deleted_by === null) {
                        data.status = 2;
                        data.save()
                            .then(savedData => {
                                res.json({
                                    success: true,
                                    message: "Update customer order status successfully."
                                })
                            })
                            .catch(err => {
                                res.json({
                                    success: false,
                                    messsage: "Failed"
                                })
                            })
                    } else if (data.status === 0) {
                        res.json({
                            success: false,
                            message: "This order is having status 'Pending'."
                        })
                    } else if (data.status === 2) {
                        res.json({
                            success: false,
                            message: "This order is having status 'Completed'."
                        })
                    } else if (data.deleted_by !== null) {
                        res.json({
                            success: false,
                            message: "This order was deleted."
                        })
                    }
                })
                .catch(err => {
                    res.json({
                        success: false,
                        message: "Customer id or order it is not found."
                    })
                })
        } else {
            res.json({
                success: false,
                message: "Status id must be between 1 or 2"
            })
        }
    }


    // [PATCH] /order/:id/reOrder
    reOrder(req, res) {
        // Order.findOne({
        //     _id: req.params.id,
        //     customer: req.user._id
        // })
        //     .then(data => {
        //         if (data.deleted_by === 0) {

        //         }
        // })
        //     .catch(err => {
        //         res.json({
        //             success: false,
        //             message: "Order is not found."
        //         })
        //     })
    }
}

module.exports = new OrderController();
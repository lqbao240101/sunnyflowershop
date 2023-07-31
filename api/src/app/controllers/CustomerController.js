const Customer = require('../models/Customer')
const CustomerProductFavorite = require('../models/CustomerProductFavorite')
const jwt = require('jsonwebtoken')
var fs = require('fs');
const { resolveSoa } = require('dns');
const { generateToken } = require('../../utils/generateToken')
const Order = require('../models/Order')
const bcrypt = require('bcrypt');
const saltRounds = Number(process.env.SALT_ROUNDS);

class CustomerController {

    // POST /customer/register => Register
    register(req, res) {
        const { firstName, lastName, email, password, confirmPassword } = req.body;
        const avatar = `data:image/jpeg;base64,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`;

        Customer.findOne({
            email: email
        })
            .then(data => {
                if (data) {
                    res.json({
                        success: false,
                        message: "Email already exists."
                    })
                } else {
                    if (password !== confirmPassword) {
                        res.json({
                            success: false,
                            message: "Password are changing. Please make sure your information is consistent"
                        })
                    } else {
                        bcrypt.hash(password, saltRounds, (err, hash) => {
                            if (err) {
                                res.json({
                                    success: false,
                                    message: "Hash failed."
                                })
                            }
                            Customer.create({
                                first_name: firstName,
                                last_name: lastName,
                                email: email,
                                password: hash,
                                avatar: avatar
                            })
                                .then(result => {
                                    CustomerProductFavorite.create({
                                        customer: result._id,
                                        products: [],
                                    })
                                        .then(favorite => {
                                            res.json({
                                                success: true,
                                                message: "Create account successfully."
                                            })
                                        })
                                        .catch(() => {
                                            res.json({
                                                success: true,
                                                message: "Create account favorite list failed."
                                            })
                                        })
                                })
                                .catch(err => {
                                    console.log(err)
                                    res.json({
                                        success: true,
                                        message: "Create account failed."
                                    })
                                })
                        })
                    }
                }
            })
            .catch(err => {
                console.log(err);
                res.json({
                    success: false,
                    message: "Something wrong."
                })
            })
    }

    // [POST] /customer/login => Login
    login(req, res) {
        const { email, password } = req.body
        Customer.findOne({
            email: email
        })
            .then(data => {
                if (data) {
                    if (data.disabled === true)
                        return res.status(403).json({
                            success: false,
                            message: "Your account has been locked. Please contact us to resolve."
                        })

                    bcrypt.compare(password, data.password, function (err, result) {
                        if (err)
                            return res.status(500).json({
                                success: false,
                                message: err
                            })

                        if (result === true) {
                            let token = generateToken(data._id);
                            // let token = jwt.sign({ id: data._id }, process.env.JWT_SECRET); //Need fix
                            return res.status(200).json({
                                success: true,
                                token: token,
                                message: "Login successfully.",
                            })
                        }

                        return res.status(400).json({
                            success: false,
                            message: "Wrong password. Try again."
                        })

                    });

                } else
                    return res.status(400).json({
                        success: false,
                        message: "Email is not found."
                    })
            })
            .catch(err => {
                return res.status(500).json({
                    success: false,
                    message: err
                })
            })
    }

    // [GET] /customer/logout => Logout
    logout(req, res) {
        res.json({
            success: true,
            message: "Logout successful."
        })
    }

    // [GET] /customer/ => Pagination Customers
    show(req, res, next) {
        let perPage = 12;
        let page = parseInt(req.query.page);
        if (page < 1 || !page) {
            page = 1;
        }

        Customer
            .find({}, { password: 0 })
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec((err, customers) => {
                Customer.countDocuments((err, count) => {
                    if (err) return next(err);
                    res.json({
                        data: customers,
                        meta: {
                            current_page: page,
                            last_page: Math.ceil(count / perPage),
                            total: count,
                        }
                    });
                });
            });
    }

    //[GET] /customer/profile => Show profile 1 user || /customer/:id/profile
    profile(req, res, next) {
        if (req.user) {
            res.json({
                success: true,
                data: req.user
            })
        } else {
            Customer.findOne({
                _id: req.params.id
            }, { password: 0 })
                .then(data => {
                    res.json({
                        success: true,
                        message: data
                    })
                })
                .catch(err => {
                    res.json({
                        success: false,
                        message: "Customer id is not found."
                    })
                })
        }
    }

    // [GET] /customer/shortProfile => Show short profile 1 user for update
    shortProfile(req, res) {
        res.json({
            success: true,
            data: {
                first_name: req.user.first_name,
                last_name: req.user.last_name,
                email: req.user.email
            }
        })
    }

    // [GET] / customer/avtar => Show avatar 1 user
    avatar(req, res) {
        res.json({
            success: true,
            avatar: req.user.avatar
        })
    }

    // [PATCH] /customer/updatePassword
    updatePassword(req, res) {
        const { password, newPassword, confirmNewPassword } = req.body;

        Customer.findOne({
            _id: req.user._id
        })
            .then(data => {
                if (!data) {
                    res.json({
                        success: false,
                        message: "Customer id is not found."
                    })
                } else {
                    if (!password) {
                        res.json({
                            success: false,
                            message: "Current password is empty."
                        })
                    } else {
                        bcrypt.compare(password, data.password, function (err, result) {
                            if (err) {
                                res.json({
                                    success: false,
                                    message: "Hash failed."
                                })
                            } else {
                                if (result == true) {
                                    if (!newPassword && !confirmNewPassword) {
                                        res.json({
                                            success: false,
                                            message: "New password and confirm new password cannot be empty."
                                        })
                                    } else {
                                        if (newPassword !== confirmNewPassword) {
                                            res.json({
                                                success: false,
                                                message: "New password and confirm new password need to be same."
                                            })
                                        } else {
                                            if (password === newPassword) {
                                                res.json({
                                                    success: false,
                                                    message: "The current password is the same as the new password."
                                                })
                                            } else {
                                                bcrypt.hash(newPassword, saltRounds, (err, hash) => {
                                                    if (err) {
                                                        res.json({
                                                            success: false,
                                                            message: "Hash failed."
                                                        })
                                                    } else {
                                                        data.password = hash
                                                        data.save()
                                                            .then(savedData => {
                                                                res.json({
                                                                    success: true,
                                                                    message: "Change password successfully."
                                                                })
                                                            })
                                                            .catch(err => {
                                                                res.json({
                                                                    success: false,
                                                                    message: "Change password failed."
                                                                })
                                                            })
                                                    }
                                                })
                                            }
                                        }
                                    }
                                } else {
                                    res.json({
                                        success: false,
                                        message: "Wrong password. Try again."
                                    })
                                }
                            }
                        })
                    }
                }
            })
            .catch(err => {
                res.json({
                    success: false,
                    message: "Something wrong!"
                })
            })
    }

    // [PATCH] /customer/update => Update
    updateInformation(req, res) {
        const { first_name, last_name, email } = req.body;

        if (req.user.first_name == first_name
            && req.user.last_name == last_name
            && req.user.email == email) {
            res.json({
                success: false,
                message: "You didn't change any infomation."
            })
        } else {
            req.user.first_name = first_name;
            req.user.last_name = last_name;
            req.user.email = email;

            req.user.save()
                .then(savedDatad => {
                    res.json({
                        success: true,
                        message: "Change information successfully."
                    })
                })
                .catch(err => {
                    res.json({
                        success: false,
                        message: "Change information failed."
                    })
                })
        }
    }

    // [PATCH] /customer/updateAvatar 
    updateAvatar(req, res) {
        const { avatar } = req.body;

        if (req.user.avatar === avatar) {
            res.json({
                success: false,
                message: "You didn't change new avatar."
            })
        } else {
            req.user.avatar = avatar;

            req.user.save()
                .then(savedData => {
                    res.json({
                        success: true,
                        message: "Change avatar successfully."
                    })
                })
                .catch(err => {
                    console.log(err)
                    res.json({
                        success: false,
                        message: "Change avatar failed."
                    })
                })
        }
    }

    // [PATCH] /customer/subscribe
    subscribe(req, res) {
        if (req.user.subscribe === false) {
            req.user.subscribe = true;

            req.user.save()
                .then(savedData => {
                    res.json({
                        success: true,
                        message: "Thank you for your subscribe! Have a nice day."
                    })
                })
                .catch(err => {
                    console.log(err);
                    res.json({
                        success: false,
                        message: "Subscribe failed."
                    })
                })
            // } else {
            //     res.json({
            //         success: false,
            //         message: "You have already subscribed."
            //     })
        } else {
            req.user.subscribe = false;

            req.user.save()
                .then(savedData => {
                    res.json({
                        success: true,
                        message: "You have unsubscribed. Please subscribe to us next time."
                    })
                })
                .catch(err => {
                    console.log(err);
                    res.json({
                        success: false,
                        message: "Unsubscribe failed."
                    })
                })
        }
    }

    // [PATCH] /customer/unsubscribe
    unsubscribe(req, res) {
        if (req.user.subscribe === true) {
            req.user.subscribe = false;

            req.user.save()
                .then(savedData => {
                    res.json({
                        success: true,
                        message: "You have unsubscribed. Please subscribe to us next time."
                    })
                })
                .catch(err => {
                    console.log(err);
                    res.json({
                        success: false,
                        message: "Unsubscribe failed."
                    })
                })
        } else {
            res.json({
                success: false,
                message: "You have already unsubscribed."
            })
        }
    }

    // [GET] /customer/dashboard
    dashboard(req, res) {
        Order.countDocuments({ customer: req.user._id, status: 2 }).exec((err, ordersCompleted) => {
            if (err) return next(err);
            Order.countDocuments({ customer: req.user._id }).exec((err, orders) => {
                if (err) return next(err);
                Order.countDocuments({ status: 0, customer: req.user._id }).exec((err, ordersPending) => {
                    if (err) return next(err);
                    res.json({
                        orders: orders,
                        ordersCompleted: ordersCompleted,
                        ordersPending: ordersPending
                    })
                })
            })
        })
    }
}

module.exports = new CustomerController();
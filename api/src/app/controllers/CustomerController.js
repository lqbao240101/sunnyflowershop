const Customer = require('../models/Customer')
const jwt = require('jsonwebtoken')
var fs = require('fs');

class CustomerController {

    // POST /customer/register => Register
    register(req, res) {
        const { first_name, last_name, email, password, confirmPassword } = req.body;

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
                    }
                    return Customer.create({
                        first_name: first_name,
                        last_name: last_name,
                        email: email,
                        password: password,
                    })
                }
            })
            .then(data => {
                res.json({
                    success: true,
                    message: "Successfully created account"
                })
            })
            .catch(err => {
                res.json({
                    success: false,
                    message: "Fail"
                })
            })

        //     let customerExists = await Customer.findOne({email: email});
        //     console.log("Hello",customerExists);

        //     if (customerExists !== null)  {
        //         return res.json({
        //             success: false,
        //             message: "Email already exists."
        //         })
        //     }

        //     if(password !== confirmPassword) {
        //         return res.json({
        //             success: false,
        //             message: "Password are changing. Please make sure your information is consistent"
        //         })
        //     }

        //     Customer
        //         .create({
        //             first_name: first_name,
        //             last_name: last_name,
        //             email: email,
        //             password: password,
        //         }).then((data) => {
        //             res.json({
        //                 success: true,
        //                 message: "Successfully created account"
        //             })
        //         }).catch(next)
    }

    // [POST] /customer/login => Login
    login(req, res) {
        const { email, password } = req.body;

        Customer.findOne({
            email: email,
            password: password
        }).then(data => {
            if (data) {
                let token = jwt.sign({
                    _id: data._id
                }, 'mk')
                res.json({
                    success: true,
                    message: "Login successfully.",
                    token: token
                })
            } else {
                res.json({
                    success: false,
                    message: "Invalid credential."
                })
            }
        }).catch(err => {
            res.json({
                success: false,
                message: "Something went wrong. Try again."
            })
        })
    }

    // [GET] /customer/ => Pagination Customers
    show(req, res, next) {
        let perPage = 2;
        let page = parseInt(req.query.page);
        if(page < 1) {
            page = 1;
        }

        Customer
            .find()
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

    // GET /customer/checkLogin => Check login
    check(req, res ) {
        try {
            var token = req.cookies.token;
            var cert = fs.readFileSync('../../key/publickey.crt')
            const decoded = jwt.verify(token, cert, { algorithm: ['RS256'] })
            if(decoded) {
                res.json({
                    success: true,
                    message: "Valid token."
                })
            }
        } catch (error) {
            res.json({
                success: false,
                message: "Invalid token."
            })
        }
    }
}

module.exports = new CustomerController();
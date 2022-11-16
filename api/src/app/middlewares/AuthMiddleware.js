const Admin = require('../models/Admin');
const Customer = require('../models/Customer');
const jwt = require('jsonwebtoken');
const fs = require('fs');

class AuthMiddleware {

    checkUser(req, res, next) {
        try {
            const authHeader = String(req.headers['authorization'] || '');
            console.log(authHeader)
            if (authHeader === null) {
                req.json({
                    success: false,
                    message: "Token is not found."
                });
            }
            if (authHeader.startsWith("Bearer ")) {
                let token = authHeader.substring(7, authHeader.length);
                // const cert = fs.readFileSync('../../key/publickey.crt')
                // const decoded = jwt.verify(token, cert, { algorithm: ['RS256'] })
                var decoded = jwt.verify(token, "secret")// Need fix
                Customer.findById(decoded.id)
                    .then(data => {
                        if (data.length !== 0) {
                            req.user = data;
                            next();
                        }
                    })
                    .catch(err => {
                        res.json({
                            success: false,
                            message: "Invalid token"
                        })
                    })
            }
        } catch (err) {
            console.log(err);
            res.json({
                success: false,
                message: "Invalid token"
            })
        }
    }

    checkIsAdmin(req, res, next) {
        try {
            const authHeader = String(req.headers['authorization'] || '');
            if (authHeader.startsWith("Bearer ")) {
                let token = authHeader.substring(7, authHeader.length);
                // var cert = fs.readFileSync('../../key/publickey.crt')
                // const decoded = jwt.verify(token, cert, { algorithm: ['RS256'] });
                let decoded = jwt.verify(token, "secret")// Need fix
                Admin.findById({ _id: decoded.id })
                    .then(function (data) {
                        if (!data) {
                            res.json({
                                success: false,
                                message: "Invalid token."
                            })
                        } else {
                            if (data.level >= 1) {
                                req.admin = data;
                                next();
                            } else {
                                res.json({
                                    success: false,
                                    message: "Not authorized. Invalid token."
                                })
                            }
                        }
                    })
            }
        } catch (err) {
            console.log(err);
            res.json({
                success: false,
                message: "Invalid token."
            })
        }
    }

    checkIsSuperAdmin(req, res, next) {
        try {
            const authHeader = String(req.headers['authorization'] || '');
            if (authHeader.startsWith("Bearer ")) {
                let token = authHeader.substring(7, authHeader.length);
                // var cert = fs.readFileSync('../../key/publickey.crt')
                // const decoded = jwt.verify(token, cert, { algorithm: ['RS256'] });
                let decoded = jwt.verify(token, "secret")// Need fix
                Admin.findById({ _id: decoded.id }).then(function (data) {
                    if (data.length === 0) {
                        res.json({
                            success: false,
                            message: "Invalid token."
                        })
                    } else {
                        if (data.level === 2) {
                            req.admin = data;
                            next();
                        } else {
                            res.json({
                                success: false,
                                message: "Not authorized. Invalid token."
                            })
                        }
                    }
                })
            }
        } catch (err) {
            console.log(err)
            res.json({
                success: false,
                message: "Invalid token."
            })
        }
    }
}

module.exports = new AuthMiddleware();
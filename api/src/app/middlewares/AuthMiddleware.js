const Admin = require('../models/Admin');
const Customer = require('../models/Customer');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const bcrypt = require('bcrypt');
const saltRounds = process.env.SALT_ROUNDS;

class AuthMiddleware {

    checkUser(req, res, next) {
        try {
            const authHeader = String(req.headers['authorization'] || '');
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
                var decoded = jwt.verify(token, process.env.JWT_SECRET)// Need fix
                Customer.findOne({
                    _id: decoded.id
                }, { password: 0 })
                    .then(data => {
                        if (data.length !== 0 && data.disabled === false) {
                            req.user = data;
                            next();
                        }
                    })
                    .catch(err => {
                        res.json({
                            success: false,
                            message: "Invalid token 1"
                        })
                    })
            }
        } catch (err) {
            console.log(err);
            res.json({
                login: false,
                success: false,
                message: "You are not logged in"
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
                jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
                    if (err)
                        return res.status(401).json({
                            success: false,
                            message: err
                        })
                    Admin.findById({ _id: decoded.id })
                        .then(data => {
                            if (data.level >= 1) {
                                req.admin = data;
                                next();
                            }
                        })
                        .catch(err => {
                            return res.status(401).json({
                                success: false,
                                message: err
                            })
                        })
                })
            } else
                return res.status(401).json({
                    success: false,
                    message: "You need to log in"
                })
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err
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
                jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
                    if (err)
                        return res.status(401).json({
                            success: false,
                            message: err
                        })
                    Admin.findById({ _id: decoded.id })
                        .then(data => {
                            if (!data)
                                return res.status(401).json({
                                    success: false,
                                    message: "Unauthorized"
                                })
                            if (data.level === 2) {
                                req.admin = data;
                                next();
                            }
                            else
                                return res.status(401).json({
                                    success: false,
                                    message: "Unauthorized"
                                })
                        })
                        .catch((err) => {
                            return res.status(500).json({
                                success: false,
                                message: err    
                            })
                        })
                })
            } else
                return res.status(401).json({
                    success: false,
                    message: "You need to log in"
                })
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err
            })
        }
    }
}

module.exports = new AuthMiddleware();
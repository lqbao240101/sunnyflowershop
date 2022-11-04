const Admin = require('../models/Admin')
const jwt = require('jsonwebtoken');
const fs = require('fs');

class AuthMiddleware {

    checkIsAdmin(req, res, next) {
        try {
            let token = req.headers.cookie.split("=")[1];
            var cert = fs.readFileSync('../../key/publickey.crt')
            const decoded = jwt.verify(token, cert, { algorithm: ['RS256'] });
            Admin.find({ _id: decoded._id }).then(function (data) {
                if (data.length === 0) {
                    res.json({
                        success: false,
                        message: "Invalid token."
                    })
                } else {
                    if (data.level >= 1) {
                        next();
                    } else {
                        res.json({
                            success: false,
                            message: "Not authorized. Invalid token."
                        })
                    }
                }
            })
        } catch {
            res.json({
                success: false,
                message: "Invalid token."
            })
        }
    }

    checkIsSuperAdmin(req, res, next) {
        try {
            let token = req.headers.cookie.split("=")[1];
            var cert = fs.readFileSync('../../key/publickey.crt')
            const decoded = jwt.verify(token, cert, { algorithm: ['RS256'] });
            Admin.find({ _id: decoded._id }).then(function (data) {
                if (data.length === 0) {
                    res.json({
                        success: false,
                        message: "Invalid token."
                    })
                } else {
                    if (data.level === 2) {
                        next();
                    } else {
                        res.json({
                            success: false,
                            message: "Not authorized. Invalid token."
                        })
                    }
                }
            })
        } catch {
            res.json({
                success: false,
                message: "Invalid token."
            })
        }
    }
}

module.exports = new AuthMiddleware();
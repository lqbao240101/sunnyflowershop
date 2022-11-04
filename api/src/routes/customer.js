const express = require('express');
const router = express.Router();
const  { checkIsAdmin, checkIsSuperAdmin } = require('../app/middlewares/AuthMiddleware')

const customerController = require('../app/controllers/CustomerController')

router.get('/', checkIsSuperAdmin, customerController.show)
router.post('/register', customerController.register)
router.post('/login', customerController.login)
router.get('/checkLogin', customerController.check)

module.exports = router;
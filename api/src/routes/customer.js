const express = require('express');
const router = express.Router();
const { checkUser, checkIsAdmin, checkIsSuperAdmin } = require('../app/middlewares/AuthMiddleware')

const customerController = require('../app/controllers/CustomerController')

router.get('/', checkIsSuperAdmin, customerController.show)
router.post('/register', customerController.register)
router.post('/login', customerController.login)
router.get('/profile', checkUser, customerController.profile)
router.get('/logout', checkUser, customerController.logout)

module.exports = router;
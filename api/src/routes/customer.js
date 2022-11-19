const express = require('express');
const router = express.Router();
const { checkUser, checkIsAdmin, checkIsSuperAdmin } = require('../app/middlewares/AuthMiddleware')

const customerController = require('../app/controllers/CustomerController')

router.get('/', checkIsSuperAdmin, customerController.show)
router.get('/profile', checkUser, customerController.profile)
router.get('/shortProfile', checkUser, customerController.shortProfile)
router.get('/logout', checkUser, customerController.logout)
router.post('/register', customerController.register)
router.get('/avatar', checkUser, customerController.avatar)
router.post('/login', customerController.login)
router.patch('/updateAvatar', checkUser, customerController.updateAvatar)
router.patch('/updateInformation', checkUser, customerController.updateInformation)
router.patch('/updatePassword', checkUser, customerController.updatePassword)
router.patch('/subscribe', checkUser, customerController.subscribe)
router.patch('/unsubscribe', checkUser, customerController.unsubscribe)
router.get('/:id/profile', checkIsAdmin, customerController.profile)

module.exports = router;
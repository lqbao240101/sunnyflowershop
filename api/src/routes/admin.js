const express = require('express');
const router = express.Router();
const { checkIsAdmin, checkIsSuperAdmin } = require('../app/middlewares/AuthMiddleware')

const AdminController = require('../app/controllers/AdminController')

router.get('/', checkIsAdmin, AdminController.profile)
router.patch('/', checkIsAdmin, AdminController.update)
router.post('/register', checkIsSuperAdmin, AdminController.register)
router.get('/logout', checkIsAdmin, AdminController.logout)
router.post('/login', AdminController.login)
router.patch('/updateAvatar', checkIsAdmin, AdminController.updateAvatar)
router.get('/dashboard', checkIsAdmin,AdminController.dashboard)
router.patch('/disable/:id', checkIsAdmin, AdminController.disable)
router.patch('/enable/:id', checkIsAdmin, AdminController.enable)

module.exports = router;
const express = require('express');
const router = express.Router();
const { checkIsAdmin, checkIsSuperAdmin } = require('../app/middlewares/AuthMiddleware')

const AdminController = require('../app/controllers/AdminController')

router.get('/', checkIsAdmin, AdminController.profile)
router.post('/create', AdminController.create)
router.get('/logout', checkIsAdmin, AdminController.logout)
router.post('/login', AdminController.login)
router.patch('/updateInformation', checkIsAdmin, AdminController.updateInformation)
router.patch('/updateAvatar', checkIsAdmin, AdminController.updateAvatar)
router.patch('/updatePassword', checkIsAdmin, AdminController.updatePassword)
router.get('/dashboard', checkIsAdmin,AdminController.dashboard)
router.patch('/disable/:id', checkIsAdmin, AdminController.disable)
router.patch('/enable/:id', checkIsAdmin, AdminController.enable)

module.exports = router;
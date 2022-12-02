const express = require('express');
const router = express.Router();
const { checkIsAdmin, checkIsSuperAdmin } = require('../app/middlewares/AuthMiddleware');

const voucherController = require('../app/controllers/VoucherController');

router.get('/', checkIsAdmin, voucherController.show)
router.post('/', checkIsSuperAdmin, voucherController.create)
router.post('/check', voucherController.check)
router.get('/countDown', voucherController.countDown)
router.delete('/:id', checkIsSuperAdmin, voucherController.delete)
router.get('/:id', checkIsAdmin, voucherController.detail)
router.put('/:id', checkIsSuperAdmin, voucherController.update)
router.patch('/:id/restore', checkIsSuperAdmin, voucherController.restore)

module.exports = router;
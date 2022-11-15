const express = require('express');
const router = express.Router();
const { checkUser, checkIsAdmin, checkIsSuperAdmin } = require('../app/middlewares/AuthMiddleware');
const { checkCart } = require('../app/middlewares/CheckCart')

const orderController = require('../app/controllers/OrderController');

router.get('/', checkUser, orderController.show);
router.post('/', checkUser, checkCart,orderController.create);
router.get('/admin', checkIsAdmin, orderController.show);
router.get('/:id', checkUser, orderController.detail);
router.patch('/:id/cancel', checkUser, orderController.cancel);
router.patch('/:id/update', checkUser, orderController.update)
router.get('/:id/:userId', checkIsAdmin, orderController.detail)
router.patch('/:id/:userId/cancel', checkIsAdmin, orderController.cancel);
router.patch('/:id/:userId/updateStatus=:statusId', checkIsAdmin, orderController.updateStatus)

module.exports = router;
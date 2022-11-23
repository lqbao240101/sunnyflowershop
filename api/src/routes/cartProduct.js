const express = require('express');
const router = express.Router();
const { checkUser, checkIsAdmin, checkIsSuperAdmin } = require('../app/middlewares/AuthMiddleware')

const cartProductController = require('../app/controllers/CartProduct')

router.get('/', checkUser, cartProductController.show)
router.patch('/:id', checkUser, cartProductController.add)
router.delete('/:id', checkUser, cartProductController.remove)
router.patch('/:id/updateQuantity', checkUser, cartProductController.updateQuantity)
router.get('/clearCart', checkUser, cartProductController.clearCart)
module.exports = router;
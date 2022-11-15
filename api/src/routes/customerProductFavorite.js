const express = require('express');
const router = express.Router();
const { checkUser, checkIsAdmin, checkIsSuperAdmin } = require('../app/middlewares/AuthMiddleware')

const customerProductFavoriteController = require('../app/controllers/CustomerProductFavorite')

router.get('/', checkUser, customerProductFavoriteController.show)
router.patch('/:id', checkUser, customerProductFavoriteController.add)
router.patch('/:id/remove', checkUser, customerProductFavoriteController.remove)

module.exports = router;
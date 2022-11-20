const express = require('express');
const router = express.Router();
const { checkUser, checkIsAdmin, checkIsSuperAdmin } = require('../app/middlewares/AuthMiddleware')

const customerProductFavoriteController = require('../app/controllers/CustomerProductFavorite')

router.get('/', checkUser, customerProductFavoriteController.show)
router.patch('/', checkUser, customerProductFavoriteController.add)
router.patch('/remove', checkUser, customerProductFavoriteController.remove)

module.exports = router;
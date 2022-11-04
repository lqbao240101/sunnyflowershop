const express = require('express');
const router = express.Router();
const  { checkIsAdmin, checkIsSuperAdmin } = require('../app/middlewares/AuthMiddleware');

const productController = require('../app/controllers/ProductController');

router.get('/', productController.show)
router.post('/', checkIsAdmin ,productController.create);
router.get('/:id', productController.detail)

module.exports = router;
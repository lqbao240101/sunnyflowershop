const express = require('express');
const router = express.Router();
const { checkIsAdmin, checkIsSuperAdmin } = require('../app/middlewares/AuthMiddleware');

const productController = require('../app/controllers/ProductController');

router.get('/', productController.show)
router.post('/', checkIsAdmin, productController.create);
router.get('/allWithDeleted', checkIsAdmin, productController.showAll)
router.post('/search', productController.search)
router.get('/hotProducts', productController.hotProducts)
router.delete('/:id', checkIsAdmin, productController.delete)
router.get('/:id', productController.detail)
router.put('/:id', checkIsAdmin, productController.update)
router.patch('/:id/restore', checkIsAdmin, productController.restore)

module.exports = router;
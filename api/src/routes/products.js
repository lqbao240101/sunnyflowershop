const express = require('express');
const router = express.Router();
const { checkIsAdmin, checkIsSuperAdmin } = require('../app/middlewares/AuthMiddleware');

const productController = require('../app/controllers/ProductController');

router.get('/', productController.show)
router.post('/', checkIsAdmin, productController.create);
router.get('/trash', checkIsAdmin, productController.trashProduct)
router.delete('/:id', checkIsAdmin, productController.delete)
router.get('/:id', productController.detail)
router.patch('/:id', checkIsAdmin, productController.update)
router.patch('/:id/restore', checkIsAdmin, productController.restore)
router.patch('/:id/updateImage', checkIsAdmin, productController.updateImage)

module.exports = router;
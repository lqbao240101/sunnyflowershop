const express = require('express');
const router = express.Router();
const { checkIsAdmin } = require('../app/middlewares/AuthMiddleware');

const categoryController = require('../app/controllers/CategoryController');

router.get('/', categoryController.show)
router.post('/', checkIsAdmin, categoryController.create);
router.get('/admin', checkIsAdmin, categoryController.showAll)
router.delete('/:id', checkIsAdmin, categoryController.delete);
router.get('/:id', checkIsAdmin, categoryController.detail)
router.put('/:id', checkIsAdmin, categoryController.update);
router.patch('/:id/restore', checkIsAdmin, categoryController.restore)

module.exports = router;
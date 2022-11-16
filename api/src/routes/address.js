const express = require('express');
const router = express.Router();
const { checkUser, checkIsAdmin, checkIsSuperAdmin } = require('../app/middlewares/AuthMiddleware')

const AddressController = require('../app/controllers/AddressController')

router.get('/', checkUser, AddressController.show)
router.post('/', checkUser, AddressController.create)
router.get('/:id', checkUser, AddressController.detail)
router.delete('/:id', checkUser, AddressController.delete)
router.put('/:id/update', checkUser, AddressController.update)

module.exports = router;
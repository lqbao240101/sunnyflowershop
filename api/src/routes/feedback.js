const express = require('express');
const router = express.Router();
const { checkUser, checkIsAdmin, checkIsSuperAdmin } = require('../app/middlewares/AuthMiddleware')

const feedbackController = require('../app/controllers/FeedbackController')

router.patch('/update/:id', checkUser, feedbackController.update)
router.delete('/delete/:id', checkUser, feedbackController.delete)
router.get('/:productId', feedbackController.show)
router.post('/:productId', checkUser, feedbackController.create)

module.exports = router;
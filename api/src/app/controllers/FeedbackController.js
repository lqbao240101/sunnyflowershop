const Feedback = require('../models/Feedback');
const Product = require('../models/Product');

class FeedbackController {

    // [GET] /feedback/:productId
    show(req, res) {

        let perPage = 3;
        let page = parseInt(req.query.page);
        if (page < 1) {
            page = 1;
        }

        Feedback
            .find({
                product: req.params.productId
            })
            .populate('customer')
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec((err, feedbacks) => {
                Feedback.countDocuments((err, count) => {
                    if (err) return next(err);
                    res.json({
                        data: feedbacks,
                        meta: {
                            current_page: page,
                            last_page: Math.ceil(count / perPage),
                            total: count,
                        }
                    });
                });
            });
    }

    // [POST] /feedback/:productId
    create(req, res) {
        const { comment } = req.body;

        Product.findOne({
            _id: req.params.productId
        })
            .then(product => {
                if (comment !== '') {
                    Feedback.create({
                        customer: req.user._id,
                        product: req.params.productId,
                        comment: comment
                    })
                        .then(result => {
                            res.json({
                                success: true,
                                message: "Create feedback successfully."
                            })
                        })

                        .catch(err => {
                            console.log(err)
                            res.json({
                                success: false,
                                message: "Create feedback failed."
                            })
                        })
                } else {
                    res.json({
                        success: false,
                        message: "You have not written a feedback yet."
                    })
                }

            })
            .catch(err => {
                res.json({
                    success: false,
                    message: "Product is not found."
                })
            })
    }

    // [PATCH] /feedback/:id
    update(req, res) {
        const { comment } = req.body;

        Feedback.findById(req.params.id)
            .then(data => {
                if (comment !== '' && comment !== data.comment) {
                    data.comment = comment;
                    data.save()
                        .then(result => {
                            res.json({
                                success: true,
                                message: "Update feedback successfully."
                            })
                        })
                        .catch(err => {
                            res.json({
                                success: false,
                                message: "Update feedback failed."
                            })
                        })
                } else if (comment === '') {
                    res.json({
                        success: false,
                        message: "You have not written a feedback yet."
                    })
                } else if (comment !== '' && comment == data.comment) {
                    res.json({
                        success: false,
                        message: "You haven't changed your feedback yet."
                    })
                }
            })
            .catch(err => {
                res.json({
                    success: false,
                    message: "Feedback is not found."
                })
            })
    }

    // [DELETE] /feedback/:id
    delete(req, res) {
        Feedback.findByIdAndDelete(req.params.id)
            .then(result => {
                res.json({
                    success: true,
                    message: "Delete your feedback successfully."
                })
            })
            .catch(err => {
                res.json({
                    success: false,
                    message: "Something wrong."
                })
            })
    }
}

module.exports = new FeedbackController();
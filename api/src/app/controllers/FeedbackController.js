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
            .find()
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
                if (product) {
                    if (comment !== '') {
                        Feedback.create({
                            customer: req.user._id,
                            product: req.params.productId
                        })
                        .then(result => {
                            res.json({
                                success: true,
                                message: "Create feedback successfully."
                            })
                        })

                        .catch(err => {
                            res.json({
                                success: false,
                                message: "Create feedback failed."
                            })
                        })
                    }
                }
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
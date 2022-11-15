const Product = require('../models/Product');
const CustomerProductFavorite = require('../models/CustomerProductFavorite')

class CustomerProductFavoriteController {

    // [GET] /favorite/
    show(req, res) {
        CustomerProductFavorite.findOne({ customer: req.user._id })
            .then(data => {
                res.json({
                    success: true,
                    data: data
                })
            })
            .catch(err => {
                console.log(err);
                res.json({
                    success: false
                })
            });
    }

    // [PATCH] /favorite/:id
    add(req, res) {
        let check = 0;

        CustomerProductFavorite.findOne({ customer: req.user._id })
            .then(data => {

                for (let i = 0; i < data.products.length; i++) {
                    if (data.products[i].toString() === req.params.id) {
                        check++;
                        break
                    }
                }

                if (check > 0) {
                    res.json({
                        success: false,
                        message: "The product is already in the favorite list."
                    })
                } else {

                    data.products.push(req.params.id);
                    data.save()
                        .then(result => {
                            res.json({
                                success: true,
                                message: "Add product to the favorite list successfully"
                            })
                        })
                        .catch(err => {
                            res.json({
                                success: false,
                                message: "Fail"
                            })
                        })
                }
            })
            .catch(err => {
                res.json({
                    success: false,
                    message: "Product id not found"
                })
            })
    }

    // [PATCH] /favorite/:id/remove
    remove(req, res) {
        CustomerProductFavorite.findOne({ customer: req.user._id })
            .then(data => {
                const index = data.products.indexOf(req.params.id);

                if (index > -1) {
                    data.products.splice(index, 1)

                    data.save()
                        .then(result => {
                            res.json({
                                success: true,
                                message: "Successfully removed the product from your faovorite list"
                            })
                        })
                        .catch(err => {
                            res.json({
                                success: false,
                                message: "Fail"
                            })
                        })
                } else {
                    res.json({
                        success: false,
                        message: "Product id not found in your favorite list"
                    })
                }
            })
            .catch(err => {
                res.json({
                    success: false,
                    message: "Something wrong"
                })
            })
    }
}

module.exports = new CustomerProductFavoriteController();
const Category = require('../models/Category')

class CategoryController {

    // [GET] /categories => Show all categories
    show(req, res) {
        let perPage = 12;
        let page = parseInt(req.query.page);
        if (page < 1) {
            page = 1;
        }

        Category
            .find()
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec((err, categories) => {
                Category.countDocuments((err, count) => {
                    if (err) return next(err);
                    res.json({
                        data: categories,
                        meta: {
                            current_page: page,
                            last_page: Math.ceil(count / perPage),
                            total: count,
                        }
                    });
                });
            });

        // Category.find({})
        //     .then(categories => {
        //         res.json({
        //             success: true,
        //             data: categories
        //         })
        //     })
        //     .catch(err => {
        //         res.json({
        //             success: false,
        //         })
        //     });
    }

    // [GET] /categories/trash => Show deleted categories
    trashCategories(req, res) {
        let perPage = 12;
        let page = parseInt(req.query.page);
        if (page < 1) {
            page = 1;
        }

        Category
            .findDeleted()
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec((err, categories) => {
                Category.countDocuments((err, count) => {
                    if (err) return next(err);
                    res.json({
                        data: categories,
                        meta: {
                            current_page: page,
                            last_page: Math.ceil(count / perPage),
                            total: count,
                        }
                    });
                });
            });

        // Category.findDeleted({})
        //     .then((categories) => {
        //         res.json({
        //             success: true,
        //             data: categories
        //         })
        //     })
        //     .catch(err => {
        //         res.json({
        //             success: false,
        //         })
        //     })
    }

    // [GET] /categories/:id => Show detail category
    detail(req, res) {
        Category.findById({ _id: req.params.id })
            .then(category => {
                res.json({
                    success: true,
                    data: category
                })
            })
            .catch(err => {
                res.json({
                    success: false,
                    message: "Category id not found."
                })
            })
    }

    // [POST] /category/ => Create Category
    create(req, res, next) {
        const { name } = req.body;

        Category.findOneWithDeleted({ name: name })
            .then(data => {
                if (data) {
                    res.json({
                        success: false,
                        message: "Category name already exists."
                    })
                } else {
                    Category.create({
                        name: name
                    })
                        .then(result => {
                            res.json({
                                success: true,
                                message: "Create voucher successfully"
                            })

                        })
                        .catch(err => {
                            res.json({
                                success: false,
                                message: "Invalid information"
                            })
                        })
                }
            })
            .catch(err => {
                console.log(err);
                res.json({
                    success: false,
                    message: "Something wrong."
                })
            })
    }

    // [PUT] /category/:id => Update Category
    update(req, res) {
        const { name } = req.body;

        Category.findById(req.params.id)
            .then(data => {
                if (name === data.name) {
                    res.json({
                        success: false,
                        message: "You didn't change category name."
                    })
                } else {
                    Category.findOneWithDeleted({ name: name })
                        .then(result => {
                            if (result) {
                                res.json({
                                    success: false,
                                    message: "Category name already exists."
                                })
                            }
                            else {
                                data.name = name;

                                data.save()
                                    .then(savedData => {
                                        res.json({
                                            success: true,
                                            message: "Update category successfully."
                                        })
                                    })
                                    .catch(err => {
                                        res.json({
                                            success: false,
                                            message: "Invalid information"
                                        })
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
            })
            .catch(err => {
                res.json({
                    success: false,
                    message: "Category id not found."
                })
            })
    }

    // [DELETE] /categories/:id => Delete Category
    delete(req, res) {
        Category.delete({ _id: req.params.id })
            .then(result => {
                res.json({
                    success: true,
                    message: "Delete category successfully"
                })

            })
            .catch(err => {
                res.json({
                    success: false,
                    message: "Category id not found"
                })
            })
    }

    // [PATCH] /categories/:id/restore
    restore(req, res) {
        Category.restore({ _id: req.params.id })
            .then(result => {
                res.json({
                    success: true,
                    message: "Restore category successfully"
                })
            })
            .catch(err => {
                res.json({
                    success: false,
                    message: "Category id not found"
                })
            })
    }
}

module.exports = new CategoryController();
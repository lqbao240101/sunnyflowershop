const Product = require('../models/Product');
const Voucher = require('../models/Voucher');

class VoucherController {
    // [GET] /voucher/ => Show all vouchers
    show(req, res) {

        let perPage = 12;
        let page = parseInt(req.query.page);
        if (page < 1 || !page) {
            page = 1;
        }

        Voucher
            .findWithDeleted()
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec((err, vouchers) => {
                Voucher.countDocuments((err, count) => {
                    if (err) return next(err);
                    res.json({
                        data: vouchers,
                        meta: {
                            current_page: page,
                            last_page: Math.ceil(count / perPage),
                            total: count,
                        }
                    });
                });
            });
    }

    // [GET] /voucher/:id => Show detail voucher
    detail(req, res) {
        Voucher.findById({ _id: req.params.id })
            .then(voucher => {
                if (voucher) {
                    res.json({
                        success: true,
                        data: voucher
                    })
                } else {
                    res.json({
                        success: false,
                        message: "This voucher was deleted, you need to restore it."
                    })
                }
            })
            .catch(err => {
                res.json({
                    success: false,
                    message: "Voucher id not found."
                })
            })
    }

    // [GET] /check => Check Voucher
    check(req, res) {
        const { name } = req.body
        const dateNow = Date.now();

        if (!name) {
            return res.json({
                success: false,
                message: "Token not found to check."
            })
        }

        Voucher.findOne({ name: name })
            .then(voucher => {
                if (voucher) {
                    if (voucher.usage > 0 && dateNow < voucher.expired_date && dateNow > voucher.effective_date) {
                        res.json({
                            success: true,
                            _id: voucher._id,
                            name: voucher.name,
                            percent: voucher.percent
                        })
                    } else {
                        res.json({
                            success: false,
                            message: "voucher is no longer valid."
                        })
                    }
                } else {
                    res.json({
                        success: false,
                        message: "Voucher not found."
                    })
                }
            }).catch(err => {
                res.json({
                    success: false,
                    message: "Something wrong"
                })
            })
    }

    // [POST] / => Create voucher
    create(req, res) {
        const { name, usage, percent, expiredDate, show, effectiveDate } = req.body;

        const date = new Date(expiredDate)

        Voucher.findOneWithDeleted({ name: name })
            .then(data => {
                if (data) {
                    res.json({
                        success: false,
                        message: "Voucher name already exists."
                    })
                } else {
                    Voucher.create({
                        name: name,
                        usage: usage,
                        percent: percent,
                        expired_date: date,
                        effective_date: effectiveDate,
                        show: show
                    })
                        .then((result) => {
                            res.json({
                                success: true,
                                message: "Create voucher successfully"
                            })
                        })
                        .catch((err) => {
                            res.json({
                                success: false,
                                message: "Invalid information or One voucher is counting down available"
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

    // [PUT] /voucher/:id => Update Voucher 
    update(req, res) {
        const { name, usage, percent, expiredDate, effectiveDate, show } = req.body;
        let setShow = show;
        if (show != 'true') {
            setShow = false
        }
        const dateEff = new Date(effectiveDate)
        const dateExp = new Date(expiredDate)

        const compareDate2 = new Date(dateEff).toISOString();
        const compareDate = new Date(dateExp).toISOString();

        Voucher.findById(req.params.id)
            .then(data => {
                if (name !== data.name) {
                    Voucher.findOneWithDeleted({ name: name })
                        .then(result => {
                            if (result) {
                                res.json({
                                    success: false,
                                    message: "Voucher name already exists."
                                })
                            } else {
                                data.name = name;
                                data.usage = usage;
                                data.percent = percent;
                                data.expired_date = dateExp;
                                data.show = setShow;
                                date.effective_date = dateEff;

                                data.save()
                                    .then(savedData => {
                                        res.json({
                                            success: true,
                                            message: "Update voucher successfully."
                                        })
                                    })
                                    .catch(err => {
                                        res.json({
                                            success: false,
                                            message: "Invalid information or One voucher is counting down available."
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
                } else {
                    if (usage == data.usage
                        && percent == data.percent
                        && compareDate === data.expired_date.toISOString()
                        && setShow === data.show
                        && compareDate2 === data.effective_date.toISOString()
                    ) {
                        res.json({
                            success: false,
                            message: "You didn't change any voucher information."
                        })
                    } else {
                        data.name = name;
                        data.usage = usage;
                        data.percent = percent;
                        data.expired_date = dateExp;
                        data.show = setShow;
                        data.effective_date = dateEff;

                        data.save()
                            .then(savedData => {
                                res.json({
                                    success: true,
                                    message: "Update voucher successfully."
                                })
                            })
                            .catch(err => {
                                res.json({
                                    success: false,
                                    message: "Invalid information"
                                })
                            })
                    }
                }
            })
            .catch(err => {
                res.json({
                    success: false,
                    message: "Voucher id not found or vourcher was deleted"
                })
            })
    }

    // [DELETE] /voucher/:id
    delete(req, res) {
        Voucher.delete({ _id: req.params.id })
            .then(() => {
                res.json({
                    success: true,
                    message: "Delete voucher successfully"
                })
            })
            .catch(err => {
                res.json({
                    success: false,
                    message: "Voucher id not found"
                })
            })
    }

    // [PATCH] /vouchers/:id/restore
    restore(req, res) {
        Voucher.restore({ _id: req.params.id })
            .then(result => {
                res.json({
                    success: true,
                    message: "Restore voucher successfully"
                })
            })
            .catch(err => {
                res.json({
                    success: false,
                    message: "Voucher id not found"
                })
            })
    }

    // [PATCH] /voucher/updateShowCountdown
    // updateShowCountDown(req, res) {
    //     const { voucherId } = req.body;

    //     Voucher.findOne({
    //         _id: voucherId
    //     })
    //         .then(data => {
    //             if(data.show === true) {
    //                 data.show = false
    //             } else {
    //                 data.show = true
    //             }

    //             data.save()
    //             .then(savedData => {
    //                 res.json({
    //                     success: true,
    //                     message: "Set count down successfully."
    //                 })
    //             })
    //             .catch(err => {
    //                 res.json({
    //                     success: false,
    //                     message: "Failed. One voucher is counting down available."
    //                 })
    //             })
    //         })
    //         .catch(err => {
    //             res.json({
    //                 success: false,
    //                 message: "Voucher id is not found."
    //             })
    //         })
    // }

    // [GET] /voucher/countDown
    countDown(req, res) {
        Voucher.findOne({
            show: true
        })
            .then(data => {
                res.json({
                    success: true,
                    data: data
                })
            })
            .catch(err => {
                res.json({
                    success: false,
                    message: "You have not selected any voucher for the countdown."
                })
            })
    }

}

module.exports = new VoucherController();

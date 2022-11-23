import React, { useState } from "react";
import { FaEdit, FaTimes } from 'react-icons/fa'
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import Cookies from 'js-cookie';
import { useForm } from "react-hook-form";
import "../../Modal.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import formatDate from "../../../../until/formatDateTime";

const VoucherEditModal = ({ idDetail }) => {
    const [modal, setModal] = useState(false);
    const [voucherName, setVoucherName] = useState('')
    const [voucherPercent, setVoucherPercent] = useState('')
    const [voucherUsage, setVoucherUsage] = useState('')
    const [VoucherExpiredDate, setVoucherexpiredDate] = useState('')
    const [effectiveDate, setEffectiveDate] = useState('')
    const [deleted, setDeleted] = useState('')
    const [show, setShow] = useState(false)
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const toggleModal = () => {
        setModal(!modal);
        axios
            .get(`http://localhost:8000/voucher/${idDetail}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('adminToken')}`,
                },
            })
            .then((response) => {
                setVoucherName(response.data.data.name);
                setVoucherPercent(response.data.data.percent)
                setVoucherUsage(response.data.data.usage)
                setVoucherexpiredDate(response.data.data.expired_date)
                setDeleted(response.data.data.deleted)
                setEffectiveDate(response.data.data.effective_date)
                setShow(response.data.data.show)
                reset(response.data.data)
            });
    };
    const reversedVoucher = () => {
        axios
            .delete(`http://localhost:8000/voucher/${idDetail}/restore`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('adminToken')}`,
                },
            })
            .then((response) => {
                alert(response.data.message)
                if (response.data.success === true) {
                    window.location.reload();
                }
            })
    }
    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }
    const closeModal = () => {
        setModal(!modal)
    }
    const onSubmit = (data) => {
        const payload = {
            ...data,
            expiredDate: formatDate(data.expiredDate),
            effectiveDate: formatDate(data.effectiveDate)
        }
        console.log(payload)
        axios
            .put(`http://localhost:8000/voucher/${idDetail}`, payload, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('adminToken')}`
                },
            })
            .then((response) => {
                alert(response.data.message);
                if (response.data.success === true) {
                    window.location.reload();
                }
            })
            .catch(function (error) {
                alert(error);
                console.log(error);
            });
    }
    const onChangeName = (e) => {
        setVoucherName(e.target.value)
    }
    const onChangePercent = (e) => {
        setVoucherPercent(e.target.value)
    }
    const onChangeUsage = (e) => {
        setVoucherUsage(e.target.value)
    }
    const onChangeDate = (e) => {
        setVoucherexpiredDate(e.target.value)
    }

    return (
        <>
            <FaEdit onClick={toggleModal} className="btn-modal">
            </FaEdit>
            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content-edit-voucher">
                        <h2 className="title_modal">Edit Voucher {idDetail}</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col lg={6}>
                                    <div className="fotm-group">
                                        <label htmlFor="name">Voucher Name</label>
                                        <input type="text"
                                            className="form-control"
                                            id="name"
                                            value={voucherName}
                                            {...register('name', { onChange: onChangeName })} />
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div className="fotm-group">
                                        <label htmlFor="percent">Voucher Percent</label>
                                        <input type="number"
                                            className="form-control"
                                            id="percent"
                                            value={voucherPercent}
                                            {...register('percent', { onChange: onChangePercent })} />
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div className="fotm-group">
                                        <label htmlFor="usage">Voucher Usage</label>
                                        <input type="number"
                                            className="form-control"
                                            id="usage"
                                            value={voucherUsage}
                                            {...register('usage', { onChange: onChangeUsage })} />
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div className="fotm-group">
                                        <label htmlFor="effectiveDate">Voucher Effective Day</label>
                                        <input type="datetime-local"
                                            className="form-control"
                                            id="effectiveDate"
                                            value={effectiveDate}
                                            {...register('effectiveDate', { onChange: (e) => { setEffectiveDate(e.target.value) } })} />
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div className="fotm-group">
                                        <label htmlFor="VoucherExpiredDate">Voucher Expired Date</label>
                                        <input type="datetime-local"
                                            className="form-control"
                                            id="VoucherExpiredDate"
                                            value={VoucherExpiredDate}
                                            {...register('expiredDate', { onChange: onChangeDate })} />
                                    </div>
                                </Col>
                                <Col lg={12}>
                                    <div className='checkbox_group'>
                                        <input
                                            id='show'
                                            type='checkbox'
                                            value={true}
                                            className='check_box'
                                            {...register("show")} />
                                        <p className="text-left">Show</p>
                                    </div>
                                </Col>
                            </Row>
                            <Col lg={12}>
                                {deleted ?
                                    <div className="btn_left_table" onClick={reversedVoucher}>
                                        <button className="theme-btn-one bg-black btn_sm">Restore</button>
                                    </div> : ""}
                                <div className="btn_right_table">
                                    <button className="theme-btn-one bg-black btn_sm">Save</button>
                                </div>
                            </Col>
                        </form>
                        <button className="close close-modal" onClick={closeModal}><FaTimes /></button>
                    </div>
                </div>
            )
            }
        </>
    )
}

export default VoucherEditModal
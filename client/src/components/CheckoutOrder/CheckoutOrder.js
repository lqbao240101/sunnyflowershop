import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from "axios";
import Cookies from 'js-cookie'
import "./CheckoutOrder.css"
import AccountEditModal from '../AccountEditArea/AccountEditModal';
import { formatter } from '../../utils/utils';

const CheckoutOrder = () => {
    const [listProduct, setListProduct] = useState([]);
    const [message, setMessage] = useState("")
    const [success, setSuccess] = useState("")
    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        axios
            .get(`http://localhost:8000/cart/`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            })
            .then((response) => {
                setListProduct(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);


    const onSubmit = (data) => {
        console.log(data)
    }


    return (
        <section id='checkout' className='ptb-100'>
            <div className='container'>
                <Row>
                    <Col lg={6} md={12} sm={12} xs={12}>
                        <div className='checkout-area-bg bg-white'>
                            <div className='check-heading'>
                                <h3>Billings Information</h3>
                            </div>
                            <div className='check-out-form'>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <Row>
                                        <Col lg={6} md={12} sm={12} xs={12}>
                                            <div className='form-group'>
                                                <label htmlFor="fname">First Name<span className="text-danger">*</span></label>
                                                <input
                                                    type="text"
                                                    value=""
                                                    className='form-control'
                                                    placeholder='First Name'
                                                    {...register("fname", { required: true })} />
                                            </div>
                                        </Col>
                                        <Col lg={6} md={12} sm={12} xs={12}>
                                            <div className='form-group'>
                                                <label htmlFor="lname">Last Name<span className="text-danger">*</span></label>
                                                <input
                                                    type="text"
                                                    value=""
                                                    className='form-control'
                                                    placeholder='Last Name'
                                                    {...register("lname", { required: true })} />
                                            </div>
                                        </Col>
                                        <Col lg={12} md={12} sm={12} xs={12}>
                                            <div className='form-group'>
                                                <label htmlFor="email">Email Address<span className="text-danger">*</span></label>
                                                <input
                                                    type="text"
                                                    value=""
                                                    className='form-control'
                                                    placeholder='Last Name'
                                                    {...register("email", { required: true })} />
                                            </div>
                                        </Col>
                                        <Col lg={6} md={12} sm={12} xs={12}>
                                            <div className='form-group'>
                                                <label htmlFor="email">Email Address<span className="text-danger">*</span></label>
                                                <input
                                                    type="text"
                                                    value=""
                                                    className='form-control'
                                                    placeholder='Last Name'
                                                    {...register("email", { required: true })} />
                                            </div>
                                        </Col>
                                    </Row>
                                </form>
                            </div>
                        </div>
                    </Col>
                    <Col lg={6} md={12} sm={12} xs={12}>
                        <div className='order_review  bg-white'>
                            <div className='order_review bg-white'>
                                <div className='check-heading'>
                                    <h3>Apply Voucher</h3>
                                </div>
                                <div className='coupon'>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <input
                                            type="text"
                                            placeholder="Coupon code"
                                            {...register("name")}
                                        />
                                        <AccountEditModal message={message} success={success} nameBtn='Apply coupon' />
                                    </form>
                                </div>
                            </div>

                            <div className='check-heading'>
                                <h3>Your Orders</h3>
                            </div>
                            <div className='table-responsive order_table'>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {console.log(listProduct)}
                                        {listProduct.map((product, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{product.product.name}<span class="product-qty">{product.quantity}</span></td>
                                                    <td>{formatter.format((product.product.price * ((100 - product.product.percent_sale) / 100)) * product.quantity)}</td>
                                                </tr>
                                            )
                                        })}

                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th>SubTotal:</th>
                                            <td className='product-subtotal'>tổng tiền </td>
                                        </tr>
                                        <tr>
                                            <th>Discount:</th>
                                            <td >giảm giá </td>
                                        </tr>
                                        <tr>
                                            <th>Total:</th>
                                            <td className='product-subtotal'>số tiền phải trả </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                            <div className='coupon'>
                                <AccountEditModal message={message} success={success} nameBtn='Place order' />
                            </div>
                        </div>

                    </Col>
                </Row>
            </div>
        </section>
    )
}

export default CheckoutOrder
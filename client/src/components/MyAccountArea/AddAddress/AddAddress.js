import React from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import { useForm, Controller } from "react-hook-form";
import '../DashBoard.css'
import axios from 'axios';
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import Cookies from 'js-cookie';
const AddAddress = () => {

    const { register, handleSubmit, watch, formState: { errors }, control } = useForm();
    const onSubmit = data => {
        console.log(data)
        axios
            .post('http://localhost:8000/address', data,
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`,
                    },
                },
            )
            .then((response) => {
                alert(response.data.success);
                console.log(response.data.message);
                if (response.data.success === true) {
                    window.location.reload(false)
                }
            })
            .catch(function (error) {
                alert(error);
                console.log(error);
            });
    }
    return (
        <div className='tab-content dashboard_content'>
            <div className='tab-pane fade show active'>
                <div id='add_product_area'>
                    <div className='container'>
                        <Row>
                            <Col lg={12}>
                                <div className='add_product_wrapper'>
                                    <h4>Add Address</h4>
                                    <form className='add_product_form'
                                        onSubmit={handleSubmit(onSubmit)}>
                                        <Row>

                                            <Col lg={6}>
                                                <div className='fotm-group'>
                                                    <label htmlFor="firstNameReceiver">First Name</label>
                                                    <input
                                                        id='firstNameReceiver'
                                                        type="text"
                                                        className='form-control'
                                                        placeholder='First Name here'
                                                        {...register("firstNameReceiver", { required: true })} />
                                                    {errors.name?.type && <span className='error'>Không được bỏ trống mục này</span>}
                                                </div>
                                            </Col>

                                            <Col lg={6}>
                                                <div className='fotm-group'>
                                                    <label htmlFor="lastNameReceiver">Last Name</label>
                                                    <input
                                                        id='lastNameReceiver'
                                                        type="text"
                                                        className='form-control'
                                                        placeholder='Last Name here'
                                                        {...register("lastNameReceiver", { required: true })} />
                                                    {errors.name?.type && <span className='error'>Không được bỏ trống mục này</span>}
                                                </div>
                                            </Col>

                                            <Col lg={6}>
                                                <div className='fotm-group'>
                                                    <label htmlFor="phoneReceiver">Phone Receiver</label>
                                                    <Controller
                                                        id='phoneReceiver'
                                                        control={control}
                                                        name="phone-input"
                                                        rules={{
                                                            validate: (value) => isValidPhoneNumber(value)
                                                        }}
                                                        render={({ field: { onChange, value } }) => (
                                                            <PhoneInput
                                                                className='form-control'
                                                                value={value}
                                                                onChange={onChange}
                                                                defaultCountry="VN"
                                                                id="phone-input"
                                                                placeholder='Phone Receiver here'
                                                            />)}
                                                        {...register("phoneReceiver", { required: true }, { min: 1 })} />
                                                    {errors.name?.type && <span className='error'>Không được bỏ trống mục này</span>}
                                                </div>
                                            </Col>

                                            <Col lg={6}>
                                                <div className='fotm-group'>
                                                    <label htmlFor="streetName">Street Name</label>
                                                    <input
                                                        id='streetName'
                                                        type="text"
                                                        className='form-control'
                                                        placeholder='Street Name here'
                                                        {...register("streetName", { required: true })} />
                                                    {errors.name?.type && <span className='error'>Không được bỏ trống mục này</span>}
                                                </div>
                                            </Col>
                                            <Col lg={6}>
                                                <div className='fotm-group'>
                                                    <label htmlFor="district">District</label>
                                                    <input
                                                        id='district'
                                                        type="text"
                                                        className='form-control'
                                                        placeholder='District here'
                                                        {...register("district", { required: true })} />
                                                    {errors.name?.type && <span className='error'>Không được bỏ trống mục này</span>}
                                                </div>
                                            </Col>
                                            <Col lg={6}>
                                                <div className='fotm-group'>
                                                    <label htmlFor="ward">Ward</label>
                                                    <input
                                                        id='ward'
                                                        type="text"
                                                        className='form-control'
                                                        placeholder='Ward here'
                                                        {...register("ward", { required: true })} />
                                                    {errors.name?.type && <span className='error'>Không được bỏ trống mục này</span>}
                                                </div>
                                            </Col>
                                            <Col lg={6}>
                                                <div className='fotm-group'>
                                                    <label htmlFor="city">City</label>
                                                    <input
                                                        id='city'
                                                        type="text"
                                                        className='form-control'
                                                        placeholder='City here'
                                                        {...register("city", { required: true })} />
                                                    {errors.name?.type && <span className='error'>Không được bỏ trống mục này</span>}
                                                </div>
                                            </Col>
                                            <Col lg={12}>
                                                <div className='vendor_order_boxed position-relative'>
                                                    <div className='btn_right_table'>
                                                        <button type='submit' className="theme-btn-one bg-black btn_sm">
                                                            Add Address
                                                        </button>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </form>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default AddAddress
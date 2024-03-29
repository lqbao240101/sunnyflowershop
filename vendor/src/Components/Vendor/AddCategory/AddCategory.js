import React from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import '../DashBoard.css'
import { useForm } from "react-hook-form";
import axios from 'axios';
import Cookies from 'js-cookie';

const AddCategory = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data)
        axios
            .post('http://localhost:8000/category/', data,
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('adminToken')}`,
                    },
                },
            )
            .then((response) => {
                alert(response.data.success);
                console.log(response.data.error);
                if (response.data.success === true) {
                    window.location.href = 'http://localhost:4000/vendor-category';
                }
            })
            .catch(function (error) {
                alert(error);
                console.log(error);
            });
    }
    return (
        <Col sm={12} md={12} lg={9}>
            <div className='tab-content dashboard_content'>
                <div className='tab-pane fade show active'>
                    <div id='add_product_area'>
                        <div className='container'>
                            <Row>
                                <Col lg={12}>
                                    <div className='add_product_wrapper'>
                                        <h4>Add Category</h4>
                                        <form className='add_product_form'
                                            onSubmit={handleSubmit(onSubmit)}>
                                            <Row>

                                                <Col lg={12}>
                                                    <div className='fotm-group'>
                                                        <label htmlFor="product_name">Category Name</label>
                                                        <input
                                                            id='category_name'
                                                            type="text"
                                                            className='form-control'
                                                            placeholder='Category Title here'
                                                            {...register("name", { required: true })} />
                                                        {errors.name?.type && <span className='error'>Không được bỏ trống mục này</span>}
                                                    </div>
                                                </Col>

                                                <Col lg={12}>
                                                    <div className='vendor_order_boxed position-relative'>
                                                        <div className='btn_right_table'>
                                                            <button type='submit' className="theme-btn-one bg-black btn_sm">
                                                                Add Product
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
        </Col >
    )
}

export default AddCategory
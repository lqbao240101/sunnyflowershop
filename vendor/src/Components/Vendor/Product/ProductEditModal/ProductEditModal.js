import React, { useState } from "react";
import { FaEdit, FaTimes, FaImage } from 'react-icons/fa'
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import Cookies from 'js-cookie';
import { useForm } from "react-hook-form";
import "../../Modal.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductEditModal = ({ idDetail }) => {
    const [isChecked, setIsChecked] = useState(true)
    const [modal, setModal] = useState(false);
    const [productName, setPoductName] = useState('')
    const [price, setPrice] = useState('')
    const [precentSale, setPrecentSale] = useState('')
    const [quantity, setQuantity] = useState('');
    const [img, setImg] = useState('');
    const [status, setStatus] = useState('')
    const [listCategories, setListCategories] = useState([]);
    const [listCategoriesOfProduct, setListCategoriesOfProduct] = useState([])
    const [description, setDescription] = useState('')
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const toggleModal = () => {
        setModal(!modal);
        axios
            .get(`http://localhost:8000/product/${idDetail}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('adminToken')}`,
                },
            })

            .then((response) => {
                reset(response.data.data);
                setPoductName(response.data.data.name);
                setPrice(response.data.data.price)
                setPrecentSale(response.data.data.percent_sale)
                setQuantity(response.data.data.quantity)
                setImg(response.data.data.img)
                setListCategoriesOfProduct(response.data.data.category.name)
                setDescription(response.data.data.description)

            });

        axios
            .get(`http://localhost:8000/category/`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('adminToken')}`,
                }
            })
            .then((response) => {
                setListCategories(response.data.data)
            })

    };
    const closeModal = () => {
        setModal(!modal);
    }
    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    const onSubmit = (data) => {
        console.log(data)
        const payload = {
            ...data,
            img: img,
            category: data.category.toString()
        }
        console.log(payload)
        axios
            .put(`http://localhost:8000/product/${idDetail}`, payload, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('adminToken')}`
                },
            })
            .then((response) => {
                console.log('chạy vo then')
                alert(response.data.success);
                console.log(response.data.message);
                if (response.data.success === true) {
                    window.location.href = 'http://localhost:4000/all-product';
                }
            })
            .catch(function (error) {
                alert(error);
                console.log(error);
            });
    }
    const handleImage = (e) => {
        const file = e.target.files[0];

        const Reader = new FileReader();

        Reader.readAsDataURL(file);

        Reader.onload = () => {
            if (Reader.readyState === 2) {
                setImg(Reader.result);
            }
        };
    };
    const onChangeName = (e) => {
        setPoductName(e.target.value)
    }

    const onChangePrice = (e) => {
        setPrice(e.target.value)
    }
    const onChangePercent = (e) => {
        setPrecentSale(e.target.value)
    }
    const onChangeQuantity = (e) => {
        setQuantity(e.target.value)
    }
    const onChangeDescription = (e) => {
        setDescription(e.target.value)
    }

    return (
        <>
            <FaEdit onClick={toggleModal} className="btn-modal">
            </FaEdit>

            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content-edit-product">
                        <h2 className="title_modal">Edit Product {idDetail}</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <div className='image-input'>
                                    <img src={img} alt="img" className='image-preview' />
                                    <input type="file" id='imageInput' accept='image/*'
                                        {...register("img", { onChange: handleImage })} />
                                    {errors.file?.type && <span className='error'>Không được bỏ trống mục này</span>}
                                    <label htmlFor="imageInput" className='image-button'><FaImage />Chọn ảnh</label>
                                </div>
                                <Col lg={6}>
                                    <div className="fotm-group">
                                        <label htmlFor="name">Product Name</label>
                                        <input type="text"
                                            className="form-control"
                                            id="name"
                                            value={productName}
                                            {...register('name', { onChange: onChangeName })} />
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div className="fotm-group">
                                        <label htmlFor="price">Product Price</label>
                                        <input type="number"
                                            className="form-control"
                                            id="price"
                                            value={price}
                                            {...register('price', { onChange: onChangePrice })} />
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div className="fotm-group">
                                        <label htmlFor="percentSale">Percent Sale Product</label>
                                        <input type="number"
                                            className="form-control"
                                            id="percentSale"
                                            value={precentSale}
                                            {...register('percentSale', { onChange: onChangePercent })} />
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div className="fotm-group">
                                        <label htmlFor="quantity">Quantity Product</label>
                                        <input type="number"
                                            className="form-control"
                                            id="quantity"
                                            value={quantity}
                                            {...register('quantity', { onChange: onChangeQuantity })} />
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div className="fotm-group">
                                        <label htmlFor="status">Status Product</label>
                                        <select type="select"
                                            className="form-control"
                                            id="status"
                                            // value={status}
                                            {...register('status', { required: true })}>

                                            <option value='1'>Còn hàng</option>
                                            <option value='0'>Hết hàng</option>
                                        </select>
                                    </div>
                                </Col>
                                <Col lg={12}>
                                    <div className='fotm-group'>
                                        <label htmlFor="caterory">Caterory</label>
                                        <Row>
                                            {listCategories.map((category, index) => {
                                                return (
                                                    <Col lg={4} key={index}>
                                                        <div className='checkbox_group'>
                                                            <>
                                                                < input
                                                                    id='caterory'
                                                                    type='checkbox'
                                                                    value={category._id}
                                                                    className='check_box'
                                                                    {...register("category", {})}
                                                                />
                                                                < p> {category.name}</p>
                                                            </>
                                                        </div>
                                                    </Col>
                                                )
                                            })}
                                        </Row>
                                    </div>
                                </Col>
                                <Col lg={12}>
                                    <div className='fotm-group'>
                                        <label htmlFor="description">Description</label>
                                        <textarea
                                            id='description'
                                            rows="4" cols=""
                                            className='form-control'
                                            value={description}
                                            spellCheck="false"
                                            {...register("description", { onChange: onChangeDescription })}
                                        ></textarea>
                                    </div>
                                </Col>
                            </Row>
                            <div className="btn_right_table">
                                <button className="theme-btn-one bg-black btn_sm">Save</button>
                            </div>
                        </form>

                        <button className="close close-modal" onClick={closeModal}><FaTimes /></button>

                    </div>
                </div>
            )
            }
        </>
    )
}

export default ProductEditModal
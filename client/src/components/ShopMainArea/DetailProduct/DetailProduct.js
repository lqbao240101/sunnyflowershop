import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { FaMinus, FaPlus, FaHeart } from "react-icons/fa"
import axios from 'axios';
import { useForm } from "react-hook-form";
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ModalATag from '../../ModalATag/ModalATag'
import { useParams } from "react-router-dom"
import CommonBanner from '../../CommonBanner';
import "./DetailProduct.css"
import AccountEditModal from "../../AccountEditArea/AccountEditModal/index"

const DetailProduct = () => {
    const { productId } = useParams()
    const [productImg, setProductImg] = useState('')
    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productDescription, setProductDescription] = useState('')
    const [quantityPurchased, setQuantityPurchased] = useState(1)
    const [message, setMessage] = useState("")
    const [success, setSuccess] = useState("")
    const [activeTab, setActiveTab] = useState('description')
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    useEffect(() => {
        axios
            .get(`http://localhost:8000/product/${productId}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            })
            .then((response) => {
                if (response.data.success) {
                    setProductImg(response.data.data.img)
                    setProductName(response.data.data.name)
                    setProductPrice(response.data.data.price)
                    setProductDescription(response.data.data.description)
                }
            })
    })
    const AddWishlist = () => {
        console.log("cái cc")
        axios
            .patch(`http://localhost:8000/favorite/`, productId, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            })
            .then((response) => {
                alert(response.data.message)
                console.log('đã bấm')
            })
    }
    const AddToCart = (data) => {
        axios
            .patch(`http://localhost:8000/cart/${productId}`, data, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            })
            .then((response) => {
                setMessage(response.data.message)
                setSuccess(response.data.success)
            })
    }

    return (
        <>
            <CommonBanner namePage="Product Details"></CommonBanner>
            <section id='product_single_one' className='ptb-100'>
                <div className='container'>
                    <div className='row area_boxed'>
                        <Col lg={4}>
                            <div className='product_single_one_img'>
                                <img src={productImg} alt="img" />
                            </div>
                        </Col>
                        <Col lg={8} className='text-left'>
                            <div className='product_details_right_one'>
                                <div className='modal_product_content_one'>
                                    <h3>{productName}</h3>
                                    <h4>${productPrice}
                                        <del>$ giá gốc ở đây</del>
                                    </h4>
                                    <p>{productDescription}</p>
                                    <form id='product_count_form_two'
                                        onSubmit={handleSubmit(AddToCart)}>
                                        <div className='product_count_one'>
                                            <div className='plus-minus-input'>
                                                <div className='input-group-button'>
                                                    <button type="button" className='button' onClick={() => { quantityPurchased > 1 ? setQuantityPurchased(quantityPurchased - 1) : setQuantityPurchased(1) }}><FaMinus></FaMinus></button>
                                                </div>
                                                <input type="number" className='form-control' readOnly value={quantityPurchased}
                                                    {...register("quantity", { required: true })} />
                                                <div className='input-group-button'>
                                                    <button type="button" className='button' onClick={() => { quantityPurchased === 5 ? setQuantityPurchased(5) : setQuantityPurchased(quantityPurchased + 1) }}><FaPlus></FaPlus></button>
                                                </div>
                                            </div>
                                        </div>
                                        <input type="submit" id="submit-form" className="hidden" />
                                    </form>
                                    <div className='links_Product_areas'>
                                        <ul>
                                            <li onClick={AddWishlist}>
                                                <ModalATag message={message} success={success} nameBtn='Add To Wishlist' icon={<FaHeart />}></ModalATag>
                                                {/* <a className='action wishlist' title="Wishlist"> <FaHeart /> Add To Wishlist</a> */}
                                            </li>
                                        </ul>
                                        <label htmlFor='submit-form'>
                                            <AccountEditModal message={message} success={success} nameBtn='Add to cart' />
                                        </label>
                                        {/* <label htmlFor='submit-form' readOnly className='theme-btn-one btn-black-overlay btn_sm'>Add To Cart</label> */}
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </div>
                    <Row>
                        <Col lg={12}>
                            <div className='product_details_tabs text-left'>
                                <ul className='nav nav-tabs'>
                                    <li onClick={() => { setActiveTab('description') }}>
                                        <a href="#description" data-toggle="tab" onClick={(e) => { e.preventDefault(); }} className={activeTab === 'description' ? "active" : ''}>Description</a>
                                    </li>
                                    <li onClick={() => { setActiveTab('review') }}>
                                        <a href="#review" data-toggle="tab" onClick={(e) => { e.preventDefault(); }} className={activeTab === 'review' ? "active" : ''}>Review</a>
                                    </li>
                                </ul>
                                <div className='tab-content'>
                                    <div id='description' className={activeTab === 'description' ? "tab-pane fade in active show" : 'tab-pane fade'}>
                                        <div className='product_description'>
                                            <p>{productDescription}</p>
                                        </div>
                                    </div>
                                    <div id='review' className={activeTab === 'review' ? "tab-pane fade in active show" : 'tab-pane fade'}>
                                        <div className='product_reviews'>
                                            <ul>
                                                <li className='media'>
                                                    <div className='media-img'>
                                                        <img src="	https://andshop-react.netlify.app/static/media/user1.be89a16c.png" alt="img" />
                                                    </div>
                                                    <div className='media-body'>
                                                        <div className='media-header'>
                                                            <div className='media-name'>
                                                                <h4>Lê Quốc Bảo</h4>
                                                                <p>5 day ago</p>
                                                            </div>
                                                        </div>
                                                        <div className='media-pragraph'>
                                                            <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Cras ultricies ligula sed magna dictum porta.Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Vivamus magna justo.</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>

            </section>
        </>
    )
}

export default DetailProduct
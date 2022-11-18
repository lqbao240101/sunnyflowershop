import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { FaMinus, FaPlus, FaHeart } from "react-icons/fa"
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useParams } from "react-router-dom"
import CommonBanner from '../../CommonBanner';
import "./DetailProduct.css"

const DetailProduct = () => {
    const { productId } = useParams()
    const [productImg, setProductImg] = useState('')
    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productDescription, setProductDescription] = useState('')
    const [quantityPurchased, setQuantityPurchased] = useState(1)
    const [activeTab, setActiveTab] = useState('description')
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
                                    {/* <div className='customs_selects'>
                                        <select name='product' className='customs_sel_box'>
                                            <option value="volvo">Size</option>
                                            <option value="xl">XL</option>
                                            <option value="smaill">S</option>
                                            <option value="medium">M</option>
                                            <option value="learz">L</option>
                                        </select>
                                    </div> */}
                                    <form id='product_count_form_two'>
                                        <div className='product_count_one'>
                                            <div className='plus-minus-input'>
                                                <div className='input-group-button'>
                                                    <button type="button" className='button' onClick={() => { quantityPurchased > 1 ? setQuantityPurchased(quantityPurchased - 1) : setQuantityPurchased(1) }}><FaMinus></FaMinus></button>
                                                </div>
                                                <input type="number" className='form-control' readOnly value={quantityPurchased} />
                                                <div className='input-group-button'>
                                                    <button type="button" className='button' onClick={() => { setQuantityPurchased(quantityPurchased + 1) }}><FaPlus></FaPlus></button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <div className='links_Product_areas'>
                                        <ul>
                                            <li>
                                                <a href="#!" className='action wishlist' title="Wishlist"> <FaHeart /> Add To Wishlist</a>
                                            </li>
                                        </ul>
                                        <button type="button" className='theme-btn-one btn-black-overlay btn_sm'>Add To Cart</button>
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
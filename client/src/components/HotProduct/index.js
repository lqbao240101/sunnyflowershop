import React from "react"
import './HotProduct.css'
// import "../ShopMainArea/DetailProduct/DetailProduct.css"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom'
import { FaRegHeart } from 'react-icons/fa'
import ProductWrapper from './ProductWrapper';
import { useState } from 'react';

function HotProduct() {
    const [unit, setUnit] = useState('new_arrival');

    return (
        <section className="pb100">
            <Container>
                <Row>
                    <Col lg={12}>
                        <div className='Content'>
                            <h2>HOT PRODUCTS</h2>
                            <p>See What Everyone Is Shopping from Andshop E-Comerce</p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <div>
                            <ul className='navTabs'>
                                <li className={unit === "new_arrival" ? 'tabOnClick' : ''} onClick={() => setUnit('new_arrival')}>NEW ARRIVAL</li>
                                <li className={unit === "trending" ? 'tabOnClick' : ''} onClick={() => setUnit('trending')}>TRENDING</li>
                                <li className={unit === "best_seller" ? 'tabOnClick' : ''} onClick={() => setUnit('best_seller')}>BEST SELLERS</li>
                                <li className={unit === "on_sell" ? 'tabOnClick' : ''} onClick={() => setUnit('on_sell')}>ON SELL</li>
                            </ul>

                        </div>
                    </Col>
                    <Col lg={12}>
                        <div className='tabs_el_wrapper'>
                            <div className='tab-content'>
                                <div id="new_arrival" className={unit === 'new_arrival' ? "tab-pane fade in active show" : 'tab-pane fade'}>
                                    <Row>
                                        {/* chạy vòng lặp ở đây */}
                                        <Col lg={3} md={4} sm={6} xs={12}>
                                            <div className="product_wrappers_one ">
                                                <div className="thumb">
                                                    <Link to="" className='image'>
                                                        <img src="	https://andshop-react.netlify.app/static/media/product1.7190443a.png" alt="" />
                                                    </Link>
                                                    <span className='badges'>
                                                        <span className='hot'>Trending</span>
                                                    </span>
                                                    <div className='actions'>
                                                        <button className='action wishlist'><FaRegHeart /></button>
                                                    </div>
                                                    <button type='button' className='add-to-cart offcanvas-toggle'>Add to cart</button>
                                                </div>
                                                <div className="content">
                                                    <h5 className='title'>
                                                        <Link to="">Green Dress For Woman</Link>
                                                    </h5>
                                                    <span className='price'>
                                                        <span className='new'>38$</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>


                                <div id="trending" className={unit === 'trending' ? "tab-pane fade in active show" : 'tab-pane fade'}>
                                    <Row>
                                        {/* chạy vòng lặp ở đây */}
                                        <Col lg={3} md={4} sm={6} xs={12}>
                                            <div className="product_wrappers_one ">
                                                <div className="thumb">
                                                    <Link to="" className='image'>
                                                        <img src="	https://andshop-react.netlify.app/static/media/product1.7190443a.png" alt="" />
                                                    </Link>
                                                    <span className='badges'>
                                                        <span className='hot'>Trending</span>
                                                    </span>
                                                    <div className='actions'>
                                                        <button className='action wishlist'><FaRegHeart /></button>
                                                    </div>
                                                    <button type='button' className='add-to-cart offcanvas-toggle'>Add to cart</button>
                                                </div>
                                                <div className="content">
                                                    <h5 className='title'>
                                                        <Link to="">Green Dress For Woman</Link>
                                                    </h5>
                                                    <span className='price'>
                                                        <span className='new'>38$</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>

                                <div id="best_seller" className={unit === 'best_seller' ? "tab-pane fade in active show" : 'tab-pane fade'}>
                                    <Row>
                                        {/* chạy vòng lặp ở đây */}
                                        <Col lg={3} md={4} sm={6} xs={12}>
                                            <div className="product_wrappers_one ">
                                                <div className="thumb">
                                                    <Link to="" className='image'>
                                                        <img src="	https://andshop-react.netlify.app/static/media/product1.7190443a.png" alt="" />
                                                    </Link>
                                                    <span className='badges'>
                                                        <span className='hot'>Trending</span>
                                                    </span>
                                                    <div className='actions'>
                                                        <button className='action wishlist'><FaRegHeart /></button>
                                                    </div>
                                                    <button type='button' className='add-to-cart offcanvas-toggle'>Add to cart</button>
                                                </div>
                                                <div className="content">
                                                    <h5 className='title'>
                                                        <Link to="">Green Dress For Woman</Link>
                                                    </h5>
                                                    <span className='price'>
                                                        <span className='new'>38$</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>

                                <div id="on_sell" className={unit === 'on_sell' ? "tab-pane fade in active show" : 'tab-pane fade'}>
                                    <Row>
                                        {/* chạy vòng lặp ở đây */}
                                        <Col lg={3} md={4} sm={6} xs={12}>
                                            <div className="product_wrappers_one ">
                                                <div className="thumb">
                                                    <Link to="" className='image'>
                                                        <img src="	https://andshop-react.netlify.app/static/media/product1.7190443a.png" alt="" />
                                                    </Link>
                                                    <span className='badges'>
                                                        <span className='hot'>Trending</span>
                                                    </span>
                                                    <div className='actions'>
                                                        <button className='action wishlist'><FaRegHeart /></button>
                                                    </div>
                                                    <button type='button' className='add-to-cart offcanvas-toggle'>Add to cart</button>
                                                </div>
                                                <div className="content">
                                                    <h5 className='title'>
                                                        <Link to="">Green Dress For Woman</Link>
                                                    </h5>
                                                    <span className='price'>
                                                        <span className='new'>38$</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>

                            </div>

                        </div>

                    </Col>
                    <Col lg={12}>
                        <div>
                            <div>
                                <div>
                                    <Row>
                                        <ProductWrapper productUnit={unit} />
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default HotProduct
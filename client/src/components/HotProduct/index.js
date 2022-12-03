import React, { useState, useEffect } from "react"
import Container from 'react-bootstrap/Container';
import styles from '../ShopMainArea/ListProduct/ListProduct.module.scss'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom'
import { FaRegHeart } from 'react-icons/fa'
import './HotProduct.css'
import { formatter } from "../../utils/utils";

function HotProduct() {
    const [unit, setUnit] = useState('new_arrival');
    const [listNewArrival, setlistNewArrival] = useState([])
    const [listOnSell, setListOnSell] = useState([])

    useEffect(() => {
        axios
            .get(`http://localhost:8000/product/hotproducts`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            })
            .then((response) => {
                setlistNewArrival(response.data.newArrival)
                setListOnSell(response.data.onSell)
            })

    }, [])

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
                                <li className={unit === "on_sell" ? 'tabOnClick' : ''} onClick={() => setUnit('on_sell')}>ON SELL</li>
                            </ul>

                        </div>
                    </Col>
                    <Col lg={12}>
                        <div className='tabs_el_wrapper'>
                            <div className='tab-content'>
                                <div id="new_arrival" className={unit === 'new_arrival' ? "tab-pane fade in active show" : 'tab-pane fade'}>
                                    <Row>
                                        {listNewArrival.map((newArrival) => {
                                            return (
                                                <Col lg={3} md={4} sm={6} xs={12} key={newArrival._id}>
                                                    <div className="product_wrappers_one ">
                                                        <div className="thumb">
                                                            <Link to={`/shop/${newArrival._id}`} className='image'>
                                                                <img src={newArrival.img} alt={newArrival.img} />
                                                            </Link>
                                                            <span className='badges'>

                                                                {newArrival.percent_sale !== 0 ? <span className={newArrival.percent_sale !== "" ? styles.sale : ""}>
                                                                    {newArrival.percent_sale + "% OFF"}</span>
                                                                    : ''}
                                                            </span>
                                                            <div className='actions'>
                                                                <button className='action wishlist'><FaRegHeart /></button>
                                                            </div>
                                                            <Link to={`/shop/${newArrival._id}`}>
                                                                <button type='button' className='add-to-cart offcanvas-toggle'>Add to cart</button>
                                                            </Link>
                                                        </div>
                                                        <div className="content">
                                                            <h5 className='title'>
                                                                <Link to={`/shop/${newArrival._id}`}>{newArrival.name}</Link>
                                                            </h5>
                                                            <span className='price'>
                                                                <span className='new'>{formatter.format(newArrival.price)}</span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </Col>
                                            )
                                        })}
                                    </Row>
                                </div>


                                <div id="on_sell" className={unit === 'on_sell' ? "tab-pane fade in active show" : 'tab-pane fade'}>
                                    <Row>
                                        {listOnSell.map((onSell) => {
                                            return (
                                                <Col lg={3} md={4} sm={6} xs={12} key={onSell._id}>
                                                    <div className="product_wrappers_one ">
                                                        <div className="thumb">
                                                            <Link to={`/shop/${onSell._id}`} className='image'>
                                                                <img src={onSell.img} alt="img" />
                                                            </Link>
                                                            <span className='badges'>
                                                                {onSell.percent_sale !== 0 ? <span className={onSell.percent_sale !== "" ? styles.sale : ""}>
                                                                    {onSell.percent_sale + "% OFF"}</span>
                                                                    : ''}
                                                            </span>
                                                            <div className='actions'>
                                                                <button className='action wishlist'><FaRegHeart /></button>
                                                            </div>
                                                            <Link to={`/shop/${onSell._id}`}>
                                                                <button type='button' className='add-to-cart offcanvas-toggle'>Add to cart</button>
                                                            </Link>
                                                        </div>
                                                        <div className="content">
                                                            <h5 className='title'>
                                                                <Link to={`/shop/${onSell._id}`}>{onSell.name}</Link>
                                                            </h5>
                                                            <span className='price'>
                                                                <span className='new'>{onSell.price}đ</span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </Col>
                                            )
                                        })}
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
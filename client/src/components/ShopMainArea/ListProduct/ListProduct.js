import React, { useEffect, useState } from 'react'
import styles from './ListProduct.module.scss'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom'
import { FaRegCheckCircle, FaTimesCircle } from 'react-icons/fa'
import { FaRegHeart, FaExpand } from "react-icons/fa";
import { formatter } from '../../../utils/utils'


function ListProduct({ currentItems }) {
    const [isLogin, setIsLogin] = useState(true)
    const [message, setMessage] = useState("")
    const [success, setSuccess] = useState("")


    const AddToCart = (productId) => {
        const payload = {
            quantity: 1
        }
        axios
            .patch(`http://localhost:8000/cart/${productId}`, payload, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            })
            .then((response) => {
                setMessage(response.data.message)
                setSuccess(response.data.success)
                setModal(!modal);
                if (!response.data.success) {
                    setIsLogin(false)
                }
            })

    }
    const [modal, setModal] = useState(false);
    const AddWishlist = (productId) => {
        const payload = { productId: productId }
        console.log(payload)
        axios
            .patch(`http://localhost:8000/favorite`, payload, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            })
            .then((response) => {
                setMessage(response.data.message)
                setSuccess(response.data.success)
                if (!response.data.success) {
                    setIsLogin(false)
                }
            })
    }
    const closeModal = () => {
        setModal(!modal);
        if (!isLogin) {
            window.location.href = '/login'
        }
    }

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }
    return (
        <Row>
            {currentItems.map((product) => {
                return (
                    <Col lg={4} md={4} sm={6} xs={12} key={product._id}>
                        <div className={styles.productWrapper}>
                            <div className={styles.thumb}>
                                <Link to={`/shop/${product._id}`} className={styles.image}>
                                    <img src={product.img} alt={product.name} />
                                </Link>
                                <span className={styles.badges}>
                                    {product.percent_sale !== 0 ? <span className={product.percent_sale !== "" ? styles.sale : ""}>
                                        {product.percent_sale + "% OFF"}</span>
                                        : ''}
                                </span>
                                <div className={styles.actions}>
                                    <a onClick={AddWishlist(product._id)} className={`${styles.wishList} ${styles.action}`} title="Wishlist" >
                                        <FaRegHeart />
                                    </a>
                                    <a href="" className={`${styles.quickView} ${styles.action}`} title="Quickview">
                                        <FaExpand />
                                    </a>
                                </div>
                                <div onClick={() => { AddToCart(product._id) }}><button className={`${styles.addToCart}`}>Add to cart</button></div>

                            </div>
                            <div className={styles.content}>
                                <h5 className={styles.title}>
                                    <a href="">{product.name}</a>
                                </h5>
                                <span className={styles.price}>
                                    {product.percent_sale !== "" ? formatter.format(product.price * ((100 - product.percent_sale) / 100)) : formatter.format(product.price)}
                                </span>
                            </div>
                            {modal && (
                                <div className="modal">
                                    <div className="overlay"></div>
                                    <div className="modal-content">
                                        <div>
                                            {success == true ? <FaRegCheckCircle size={90} className='colorSuccess' /> : <FaTimesCircle size={90} className='colorFail' />}
                                        </div>
                                        <h2 className="title_modal">{product.name} {success ? 'Successful' : 'Failed'}</h2>
                                        <p className='p_modal'>{message}</p>
                                        <div className='divClose'>
                                            <button className="close close-modal" onClick={closeModal}>OK</button>
                                        </div>

                                    </div>
                                </div>
                            )}
                        </div>
                    </Col>

                )
            })}
        </Row>)
}
export default ListProduct
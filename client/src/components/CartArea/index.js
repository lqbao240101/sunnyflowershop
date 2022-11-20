import styles from './Cart.module.scss'
import Container from 'react-bootstrap/Container';
import { FaTrashAlt } from 'react-icons/fa';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import EmptyCart from './EmptyCart';
import axios from "axios";
import ModalATag from '../ModalATag/ModalATag';
import Cookies from 'js-cookie'
import { formatter } from '../../utils/utils';
import ListProduct from './ListProduct';
import AccountEditModal from '../AccountEditArea/AccountEditModal';

function CartArea() {
    const [listProduct, setListProduct] = useState([]);
    const [message, setMessage] = useState("")
    const [success, setSuccess] = useState("")
    const [percent, setpercent] = useState(0)
    const [totalPriceCar, settotalPriceCar] = useState(0)

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
    const handleDeleteProduct = (idProduct) => {
        axios
            .delete(`http://localhost:8000/cart/${idProduct}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`
                }
            })
            .then((response) => {
                setMessage(response.data.message)
                setSuccess(response.data.success)
            })
    }

    const { register, handleSubmit, formState: { errors }, } = useForm();

    const onSubmit = (data) => {
        axios
            .post(`http://localhost:8000/voucher/check`, data, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            })
            .then((response) => {
                console.log("đã chạy")
                setMessage(response.data.success)
                setSuccess(response.data.success)
                setpercent(response.data.percent)
            })
    }
    return (
        <>
            {listProduct.length === 0 && <EmptyCart />}
            {
                listProduct.length !== 0 &&
                <section id={styles.cartArea} className='ptb100'>
                    <Container>
                        <Row>
                            <Col lg={12} md={12} sm={12} xs={12}>
                                <div className={styles.tableDesc}>
                                    <div className={`${styles.tablePage} ${styles.tableResponsive}`}>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th className={styles.productThumb}>Image</th>
                                                    <th className={styles.productName}>Product</th>
                                                    <th className={styles.productPrice}>Price</th>
                                                    <th className={styles.productQuantity}>Quantity</th>
                                                    <th className={styles.productTotal}>Total</th>
                                                    <th className={styles.productRemove}>Remove</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {listProduct.map((product, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td className={styles.productThumb}>
                                                                <Link>
                                                                    <img src={product.product.img} alt="img" />
                                                                </Link>
                                                            </td>
                                                            <td className={styles.productName}>
                                                                <Link>
                                                                    {product.product.name}
                                                                </Link>
                                                            </td>
                                                            <td className={styles.productPrice}>
                                                                {formatter.format(product.product.price * ((100 - product.product.percent_sale) / 100))}
                                                            </td>
                                                            <td className={styles.productQuantity}>
                                                                <input onKeyDown={(evt) => evt.key === 'e' && evt.preventDefault()} type="number" defaultValue={product.quantity} min="1" max="5" />
                                                            </td>
                                                            <td className={styles.productTotal}>{formatter.format((product.product.price * ((100 - product.product.percent_sale) / 100)) * product.quantity)}</td>
                                                            <td className={styles.productRemove} onClick={() => handleDeleteProduct(product.product._id)}>
                                                                {settotalPriceCar(0 + (product.product.price * ((100 - product.product.percent_sale) / 100)) * product.quantity)}
                                                                <ModalATag message={message} success={success} icon={<FaTrashAlt />} />
                                                            </td>
                                                            {console.log('chạy ')}
                                                        </tr>
                                                    )
                                                })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className={styles.btnClearCart}>

                                        <button type="button" className='theme-btn-one btn-black-overlay btn_sm'>Clear cart</button>
                                    </div>
                                </div>
                                <div className={styles.coupon}>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <input
                                            type="text"
                                            placeholder="Coupon code"
                                            {...register("name", {})}
                                        />
                                        <AccountEditModal message={message} success={success} nameBtn='Apply coupon' />
                                    </form>
                                </div>
                            </Col>
                            <Col lg={12} md={12}>
                                <div className={styles.cartTotal}>
                                    <h3>Cart Total</h3>
                                    <div className={styles.cartInner}>
                                        <div className={styles.cartSubTotal}>
                                            <p>Subtotal</p>
                                            <p className={styles.cartSubTotalDetail}>${totalPriceCar}</p>
                                        </div>
                                        <div className={styles.cartSubTotal}>
                                            <p>Coupon</p>
                                            <p className={styles.cartSubTotalDetail}><span>Discount: </span>- {percent}%</p>
                                        </div>
                                        <div className={`${styles.cartSubTotal} ${styles.border}`}>
                                            <p>Total</p>
                                            <p className={styles.cartSubTotalDetail}>$159.00</p>
                                        </div>
                                        <div className={styles.checkoutBtn}>
                                            <Link to="" className='theme-btn-one btn-black-overlay btn_sm'>Proceed to Checkout</Link>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            }
        </>
    )
}

export default CartArea

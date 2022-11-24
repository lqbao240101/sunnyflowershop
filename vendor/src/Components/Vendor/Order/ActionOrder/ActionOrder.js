import React, { useState, useEffect } from 'react'
import { FaListAlt, FaTimes, FaImage } from 'react-icons/fa'
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import Cookies from 'js-cookie';
import { useForm } from "react-hook-form";
import 'bootstrap/dist/css/bootstrap.min.css';
import { formatter } from '../../../../until/FormatterVND';

const ActionOrder = ({ idOrder, idCustomer }) => {
    const [modal, setModal] = useState(false);
    const [idDelivery, setIdDelivery] = useState('')
    const [createdAt, setCreatedAt] = useState('')
    const [totalPrice, settotalPrice] = useState('')
    const [listProducts, setListProducts] = useState([])
    const [address, setAddress] = useState('')
    const [deletedBy, setDeletedBy] = useState()
    const [state, setState] = useState('')
    const [discount, setDiscount] = useState(0)
    const [totalPriceCart, settotalPriceCart] = useState(0)
    const [phoneReceiver, setPhoneReceiver] = useState('')
    const [nameReceiver, setNameReceiver] = useState('')
    // const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const toggleModal = () => {
        setModal(!modal);
        console.log(`http://localhost:8000/order/${idOrder}/${idCustomer}`)
        axios
            .get(`http://localhost:8000/order/${idOrder}/${idCustomer}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('adminToken')}`,
                },
            })

            .then((response) => {
                setIdDelivery(response.data.data.id_delivery)
                setCreatedAt(response.data.data.createdAt)
                settotalPrice(response.data.data.total_price)
                setListProducts(response.data.data.order_products)
                setPhoneReceiver(response.data.data.phone_receiver)
                setState(response.data.data.status)
                setAddress(response.data.data.address)
                setDeletedBy(response.data.data.deleted_by)
                setDiscount(response.data.data.voucher.percent)
                setNameReceiver(response.data.data.name_receiver)
            });
    };

    const closeModal = () => {
        setModal(!modal);
    }
    const handleState = () => {
        axios
            .patch(`http://localhost:8000/order/${idOrder}/${idCustomer}/updateStatus=${state + 1}`, 1, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('adminToken')}`,
                },
            })
            .then((response) => {
                alert(response.data.message)
                window.location.reload(false)
            })
    }
    const handleCancel = () => {
        axios
            .patch(`http://localhost:8000/order/${idOrder}/${idCustomer}/cancel`, 1, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('adminToken')}`,
                },
            })
            .then((response) => {
                alert(response.data.success)
                window.location.reload(false)
            })
            .catch((err) => { console.log(err) })

    }
    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    const [couter, setcouter] = useState(0)
    useEffect(() => {
        listProducts.map((product) => {
            if (couter < 1) {
                settotalPriceCart(totalPriceCart => totalPriceCart + (product.product.price * ((100 - product.product.percent_sale) / 100)) * product.quantity)
                setcouter(couter + 1)
            }
        })
    }, [listProducts])

    return (
        <div><FaListAlt onClick={toggleModal} />
            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content-order">
                        <Row>
                            <div className='detail-wrapper'>
                                <div className='detail-header'>
                                    <Row className='header-conten'>
                                        <h4>
                                            Detail Order {idDelivery}
                                        </h4>
                                    </Row>
                                    <Row>
                                        <Col lg={6}>
                                            <div className='detail-bottom'>
                                                <ul>
                                                    <li>
                                                        <span>Issue Date: </span>
                                                        <h6>{createdAt}</h6>
                                                    </li>
                                                </ul>
                                                <ul>
                                                    <li>
                                                        <span>Status: </span>
                                                        {deletedBy ? <h6 className='Cancelled'>Cancelled</h6> : state === 0 ? <h6 className='Pending'>Pending</h6> : state === 1 ? <h6 className='Confirmed'>Confirm</h6> : <h6 className='Completed'>Completed</h6>}
                                                    </li>
                                                </ul>
                                                <ul>
                                                    <li>
                                                        <span>Name Receiver: </span>
                                                        <h6 >{nameReceiver}</h6>
                                                    </li>
                                                </ul>

                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className='detail-bottom'>
                                                <ul>
                                                    <li>
                                                        <span>Address: </span>
                                                        <h6>{address}</h6>
                                                    </li>
                                                </ul>
                                                <ul>
                                                    <li>
                                                        <span>Phone Receiver: </span>
                                                        <h6>{phoneReceiver}</h6>
                                                    </li>
                                                </ul>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <div className='detail-body'>
                                    <table className='table table-borderless mb-0'>
                                        <thead>
                                            <tr>
                                                <th scope='col'>#</th>
                                                <th scope='col'>Product</th>
                                                <th scope='col'>PRICE</th>
                                                <th scope='col'>Quantity</th>
                                                <th scope='col'>Discount</th>
                                                <th scope='col'>TOTAL</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listProducts.map((product) => {
                                                return (
                                                    <tr key={product._id} >
                                                        <th scope='col' className='img_product_order'><img src={product.product.img} alt="img" /></th>
                                                        <th scope='col'>{product.product.name}</th>
                                                        <th scope='col'>{formatter.format(product.price)}</th>
                                                        <th scope='col'>{product.quantity}</th>
                                                        <th scope='col'>{product.percent_sale}%</th>
                                                        <th scope='col'>{formatter.format((product.price * (1 - (product.percent_sale / 100))) * product.quantity)}</th>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td colSpan={2}></td>
                                                <td colSpan={1}></td>
                                                <td className='font-bold text-dark' colSpan={2}>Total</td>
                                                <td className='font-bold text-theme'>{formatter.format(totalPriceCart)}</td>
                                            </tr>
                                            {discount ? <tr>
                                                <td colSpan={2}></td>
                                                <td colSpan={1}></td>
                                                <td className='font-bold text-dark' colSpan={2}>Voucher</td>
                                                <td className='font-bold text-theme'>-{discount}%</td>
                                            </tr> : ""}
                                            <tr>
                                                <td colSpan={2}></td>
                                                <td colSpan={1}></td>
                                                <td className='font-bold text-dark' colSpan={2}>Grand total</td>
                                                <td className='font-bold text-theme'>{formatter.format(totalPrice)}</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                    <div className='detail-footer text-center'>
                                        {deletedBy ? "" : state === 2 ? "" : <p >Which state would you like to change?</p>}
                                        <div className='buttons'>
                                            {deletedBy ? '' : state === 0 ? <button className='theme-btn-one btn-blue-overlay btn_sm' onClick={handleState}>Confirm</button> : state === 1 ? <button className='theme-btn-one btn-blue-overlay btn_sm' onClick={handleState}>Complete</button> : ""}

                                            {deletedBy ? "" : state === 2 ? '' : <button className='theme-btn-one btn-red-overlay btn_sm ml-2' onClick={handleCancel}>Cancel</button>}
                                        </div>
                                    </div>
                                    <button className="close close-modal" onClick={closeModal}><FaTimes /></button>

                                </div>
                            </div>
                        </Row>
                    </div >
                </div >)}
        </div >
    )
}

export default ActionOrder
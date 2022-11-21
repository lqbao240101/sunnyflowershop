import React, { useState } from 'react'
import { FaListAlt, FaTimes, FaImage } from 'react-icons/fa'
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import Cookies from 'js-cookie';
import { useForm } from "react-hook-form";
import 'bootstrap/dist/css/bootstrap.min.css';

const ActionOrder = ({ idOrder, idCustomer }) => {
    const [modal, setModal] = useState(false);
    const [idDelivery, setIdDelivery] = useState('')
    const [createdAt, setCreatedAt] = useState('')
    const [totalPrice, settotalPrice] = useState('')
    const [listProducts, setListProducts] = useState([])
    const [address, setAddress] = useState('')
    const [deletedBy, setDeletedBy] = useState()
    const [state, setState] = useState('')
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
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
                // setEmail(response.data.data.customer.email)
                setState(response.data.data.status)
                setAddress(response.data.data.address)
                setDeletedBy(response.data.data.deleted_by)
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
                                                <th scope='col'>TOTAL</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listProducts.map((product) => {
                                                return (
                                                    <tr key={product._id} >
                                                        <th scope='col'><img src={product.img} alt="img" /></th>
                                                        <th scope='col'>{product.name}</th>
                                                        <th scope='col'>{product.price}</th>
                                                        <th scope='col'>{product.quantity}</th>
                                                        <th scope='col'>{product.price * product.quantity}</th>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td colSpan={2}></td>
                                                <td className='font-bold text-dark' colSpan={2}>Grand total</td>
                                                <td className='font-bold text-theme'>{totalPrice}</td>
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
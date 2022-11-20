import React, { useState } from 'react'
import { FaListAlt, FaTimes, FaImage } from 'react-icons/fa'
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import Cookies from 'js-cookie';
import { useForm } from "react-hook-form";
import 'bootstrap/dist/css/bootstrap.min.css';

const UserDetail = ({ idDetail, firstNameDetail, lastNameDetail }) => {
    const [modal, setModal] = useState(false);
    const [firstName, setFirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [email, setEmail] = useState('')
    const [avatar, setAvatar] = useState('')
    const [subscribed, setSubscribed] = useState('')

    const { register, formState: { errors } } = useForm();
    const toggleModal = () => {

        const timer = setTimeout(() => {
            setModal(!modal);
        }, 500);
        axios
            .get(`http://localhost:8000/customer/${idDetail}/profile`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('adminToken')}`,
                },
            })
            .then((response) => {
                setFirstName(response.data.message.first_name);
                setlastName(response.data.message.last_name)
                setEmail(response.data.message.email)
                setAvatar(response.data.message.avatar)
                if (response.data.message.subscribe === true) {
                    setSubscribed('Yes')
                } else {
                    setSubscribed('No')
                }
            });
        return () => clearTimeout(timer);
    };
    const closeModal = () => {
        setModal(!modal);
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
                    <div className="modal-content">
                        {/* <h2 className="title_modal">User Profile</h2> */}
                        <h2 className="title_modal">{firstNameDetail} {lastNameDetail}</h2>
                        <form >
                            <Row>
                                <Col lg={12}>
                                    <div className='image-input'>
                                        <img src={avatar} alt="img" className='image-preview' />

                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div className="fotm-group">
                                        <label htmlFor="firstName">First Name</label>
                                        <input type="text"
                                            className="form-control"
                                            id="firstName"
                                            value={firstName}
                                            {...register('firstName', { required: true, disabled: true })} />
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div className="fotm-group">
                                        <label htmlFor="lastName">Last Name</label>
                                        <input type="text"
                                            className="form-control"
                                            id="lastName"
                                            value={lastName}
                                            {...register('lastName', { required: true, disabled: true })} />
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div className="fotm-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="text"
                                            className="form-control"
                                            id="email"
                                            value={email}
                                            {...register('email', { required: true, disabled: true })} />
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div className="fotm-group">
                                        <label htmlFor="Subscribed">Subscribed</label>
                                        <input type="text"
                                            className="form-control"
                                            id="Subscribed"
                                            value={subscribed}
                                            {...register('subscribed', { required: true, disabled: true })} />
                                    </div>
                                </Col>
                            </Row>
                            <div className="btn_right_table">
                                <button onClick={closeModal} className="theme-btn-one bg-black btn_sm">Close</button>
                            </div>
                        </form>

                        <button className="close close-modal" onClick={closeModal}><FaTimes /></button>

                    </div>
                </div>)}
        </div>
    )
}

export default UserDetail
import styles from '../MyAccountArea.module.scss';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom'

function CustomerAddress() {

    const [listAddress, setListAddress] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/address/`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            })
            .then((response) => {
                if (response.data.success) {
                    setListAddress(response.data.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    return (
        <Row className='area_content'>
            <Col lg={12} md={12} sm={12} xs={12} className='position-relative'>
                <h4 className='text-right p-3'>
                    <Link data-toggle="tab" className="theme-btn-one bg-black btn_sm " to="/my-account/add-address">
                        Add Address
                    </Link>
                </h4>
            </Col>
            {listAddress.map((address, index) => {
                return (
                    <Col lg={6} key={index}>
                        <div className={styles.myaccountContent}>
                            <h4 className={styles.title}>Shipping Address {index + 1}</h4>
                            <div className={styles.shippingAddress}>
                                <h5>
                                    <strong>{address.first_name_receiver} {address.last_name_receiver}</strong>
                                </h5>
                                <p>
                                    {address.street_name}, {address.district}<br />
                                    {address.ward}, {address.city}
                                </p>
                                <p>Mobile: {address.phone_receiver}</p>
                                <Link to={`/address-edit/id=${address._id}`} className='theme-btn-one bg-black btn_sm mt-4'>Edit Address</Link>
                            </div>
                        </div>
                    </Col>
                )
            })
            }
        </Row >
    )
}

export default CustomerAddress
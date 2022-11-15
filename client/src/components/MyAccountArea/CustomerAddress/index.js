import styles from '../MyAccountArea.module.scss';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom'

function CustomerAddress() {

    const [listAddress, setListAddress] = useState([]);

    // useEffect(() => {
    //     axios
    //         .get(`http://localhost:8000/customer/profile`, {
    //             headers: {
    //                 Authorization: `Bearer ${Cookies.get('token')}`,
    //             },
    //         })
    //         .then((response) => {
    //             if (response.data.success) {
    //                 setListAddress(response.data.data);
    //             }
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }, []);

    return (
        <Row>
            <Col lg={12} md={12} sm={12} xs={12} className='position-relative'>
                <h4 className='text-right'>
                    <Link data-toggle="tab" className="theme-btn-one bg-black btn_sm add_prod_button " to="/my-account/add-address">
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
                                    <strong>{address.nameReceiver}</strong>
                                </h5>
                                <p>
                                    {address.streetName}, {address.district}<br />
                                    {address.ward}, {address.city}
                                </p>
                                <p>Mobile: {address.phoneReceiver}</p>
                                <Link to={`/address-edit/id=${address.id}`} className='theme-btn-one bg-black btn_sm mt-4'>Edit Address</Link>
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
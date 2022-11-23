import React, { useState, useEffect } from 'react'
import styles from '../MyAccountArea.module.scss';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import Cookies from 'js-cookie';

function CustomerDashboard() {
    const [orderPending, setOrderPending] = useState(0)
    const [ordersCompleted, setOrdersCompleted] = useState(0)
    const [totalOrders, setTotalOrders] = useState(0)

    useEffect(() => {
        axios
            .get(`http://localhost:8000/customer/dashboard`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            })
            .then((response) => {
                setOrderPending(response.data.ordersPending)
                setOrdersCompleted(response.data.ordersCompleted)
                setTotalOrders(response.data.orders)
            })
    }, [ordersCompleted, orderPending, totalOrders])

    return (
        <>
            <Row>
                <Col lg={4} md={4} sm={6} xs={12}>
                    <div className={`pt-4 ${styles.dashboardTopBox}`}>
                        <h2>{totalOrders}</h2>
                        <h4>Total Orders</h4>
                    </div>
                </Col>
                <Col lg={4} md={4} sm={6} xs={12}>
                    <div className={`pt-4 ${styles.dashboardTopBox}`}>
                        <h2>{ordersCompleted}</h2>
                        <h4>Total Delivery</h4>
                    </div>
                </Col>
                <Col lg={4} md={4} sm={6} xs={12}>
                    <div className={`pt-4 ${styles.dashboardTopBox}`}>
                        <h2>{orderPending}</h2>
                        <h4>Total Pending</h4>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg={6} md={6} sm={12} xs={12}>

                </Col>
            </Row>
        </>
    )
}

export default CustomerDashboard
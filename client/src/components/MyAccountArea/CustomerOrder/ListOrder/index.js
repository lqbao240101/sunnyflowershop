import styles from '../../MyAccountArea.module.scss'
import { formatter } from '../../../../utils/utils';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

function ListOrder() {

    const [listOrder, setListOrders] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/order/`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            })
            .then((response) => {

                setListOrders(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);
    console.log(listOrder)
    return (
        <>
            {listOrder.map((Order, index) => {
                return (
                    <tr key={index}>
                        <td>
                            {Order.id_delivery}
                        </td>
                        <td>{Order.name_receiver}</td>
                        <td>{Order.phone_receiver}</td>
                        <td>{Order.address}</td>
                        <td>
                            {Order.deleted_by ? <span className='Cancelled'>Cancelled</span> : Order.status === 0 ? <span className='Pending'>Pending</span> : Order.status === 1 ? <span className='Confirmed'>Confirm</span> : <span className='Completed'>Completed</span>}
                        </td>
                        <td>{formatter.format(Order.total_price)}</td>
                        {/* <td><ActionOrder idOrder={Order._id} idCustomer={Order.customer._id} /> </td> */}
                    </tr>
                )
            })}
        </>
    )
}

export default ListOrder;
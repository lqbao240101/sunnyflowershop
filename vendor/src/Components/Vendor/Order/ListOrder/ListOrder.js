import React from 'react'
import ActionOrder from '../ActionOrder/ActionOrder'
import { formatter } from '../../../../until/FormatterVND'

const ListOrder = ({ currentOrder }) => {
    return (
        <>
            {currentOrder && Object.values(currentOrder).map((Order, index) => {
                return (
                    <tr key={index}>
                        <td>
                            {Order.id_delivery}
                        </td>
                        <td>{Order.customer.first_name} {Order.customer.last_name}</td>
                        <td>{Order.name_receiver}</td>
                        <td>{Order.phone_receiver}</td>
                        <td>{Order.address}</td>
                        <td>
                            {Order.deleted_by ? <span className='Cancelled'>Cancelled</span> : Order.status === 0 ? <span className='Pending'>Pending</span> : Order.status === 1 ? <span className='Confirmed'>Confirm</span> : <span className='Completed'>Completed</span>}
                        </td>
                        <td>{Order.total_price}₫</td>
                        <td><ActionOrder idOrder={Order._id} idCustomer={Order.customer._id} /> </td>
                    </tr>
                )
            })
            }
        </>
    )
}

export default ListOrder
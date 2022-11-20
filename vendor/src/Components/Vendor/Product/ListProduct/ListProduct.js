import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import DeleteProduct from '../DeleteProduct/DeleteProduct'
import ProductEditModal from '../ProductEditModal/ProductEditModal'

const ListProducts = ({ listProducts }) => {
    return (
        <>
            {listProducts.length == 0 ? <tr className='text-center'>
                <td>empty product list</td>
            </tr>
                : listProducts.map((Product) => {
                    return (
                        <tr key={Product._id}>
                            <td>
                                <a>
                                    <img width="70px" src={Product.img} alt="img" />
                                </a>
                            </td>
                            <td>
                                <a href="/product-details-one/1 ">{Product.name}</a>
                            </td>
                            <td>
                                {Product.category.name}
                                {/* {Product.category.map((Categories, i) => {
                                if (i + 1 === Product.categories.length) {
                                    return (Categories.name)
                                }
                                else {
                                    return `${Categories.name}, `
                                }
                            })} */}
                            </td>
                            <td>${Product.price}</td>
                            <td>{Product.percent_sale}</td>
                            {Product.status === 1 ? <td>Còn hàng</td> : <td>hết hàng</td>}
                            {/* {console.log('cc', Product.deletedAt)} */}
                            {Product.deleted === true ? <td>đã xoá</td> : <td>chưa xoá</td>}
                            <td>
                                <div className='edit_icon'><ProductEditModal idDetail={Product._id} /></div>
                                <div className='edit_icon'><DeleteProduct idDetail={Product._id} nameDetail={Product.name} /></div>
                            </td>
                        </tr>
                    )
                })
            }
        </>

    )
}

export default ListProducts
import styles from '../Cart.module.scss'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import { formatter } from '../../../utils/utils';
import { FaMinus, FaPlus, FaHeart } from "react-icons/fa"
import axios from 'axios';
import Cookies from 'js-cookie';
import { useForm } from "react-hook-form";
import ModalATag from '../../ModalATag/ModalATag';


function ListProduct(prop) {

    const [listProduct, setListProduct] = useState([]);
    const [message, setMessage] = useState("")
    const [success, setSuccess] = useState("")
    const { register, handleSubmit } = useForm();
    useEffect(() => {
        setListProduct(prop.list);
    }, [prop.list]);

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
                window.location.reload(false)
            })
    }
    return (
        <>
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
                            <div className='input-group-button'>
                                <button type="button" className='button' onClick={() => { }}><FaMinus></FaMinus></button>
                            </div>
                            <input
                                // onKeyDown={(evt) => evt.key === 'e' && evt.preventDefault()}
                                type="number"
                                value={product.quantity}
                                {...register('quantity', { min: 1, max: 10 })}
                            />
                            <div className='input-group-button'>
                                <button type="button" className='button' onClick={() => { }}><FaPlus></FaPlus></button>
                            </div>
                        </td>
                        <td className={styles.productTotal}>{formatter.format((product.product.price * ((100 - product.product.percent_sale) / 100)) * product.quantity)}</td>
                        <td className={styles.productRemove} onClick={() => handleDeleteProduct(product.product._id)}>
                            <ModalATag message={message} success={success} icon={<FaTrashAlt />} />
                        </td>

                    </tr>
                )
            })
            }
        </>
    )
}

export default ListProduct;
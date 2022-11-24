import axios from 'axios'
import React, { useState, useEffect, useReducer } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import CategoryEditModal from '../CategoryEditModal/CategoryEditModal'
import Cookies from 'js-cookie';
import DeleteCategory from '../DeleteCategory/DeleteCategory';

const ListCategories = ({ currentCategory }) => {

    return (
        <>
            {currentCategory && currentCategory.map((Category) => {
                return (
                    <tr key={Category._id}>
                        <td >
                            {Category._id}
                        </td>
                        <td>{Category.name}</td>
                        <td><div className='edit_icon'> <CategoryEditModal idDetail={Category._id} nameDetail={Category.name} /></div>
                            <div className='edit_icon'><DeleteCategory idDetail={Category._id} nameDetail={Category._name} /></div>
                        </td>
                    </tr>
                )
            })
            }
        </>
    )
}

export default ListCategories
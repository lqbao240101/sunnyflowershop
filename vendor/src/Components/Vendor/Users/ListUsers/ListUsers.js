import React from 'react'
import UserDetail from '../UserDetail/UserDetail'


const ListUsers = ({ listUsers }) => {
    return (
        <>
            {listUsers.map((User, index) => {

                return (
                    <tr key={index}>
                        <td>{User._id}</td>
                        <td>
                            <a>
                                {User.avatar ? <img width="70px" src={User.avatar} alt="img" /> : <img width="70px" src={User.defaultAvatar} alt="img" />}
                            </a>
                        </td>
                        <td>
                            <a href="/product-details-one/1 ">{User.first_name} {User.last_name}</a>
                        </td>
                        <td>{User.email}</td>
                        {User.subscribed === 0 ? <td>No</td> : <td>Yes</td>}
                        <td><UserDetail idDetail={User._id} firstNameDetail={User.first_name} lastNameDetail={User.last_name} /></td>


                    </tr>
                )
            })
            }
        </>
    )
}

export default ListUsers
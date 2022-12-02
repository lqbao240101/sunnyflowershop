import { FaTruck, FaAngleDown, FaTachometerAlt, FaCubes, FaSignOutAlt } from 'react-icons/fa'
import styles from '../TopHeader.module.scss'
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from '../../../../service/axiosClient';

function TopHeaderRightAuth({ user }) {
    const handleLogout = () => {
        console.log("đã chạy")
        axios
            .get('http://localhost:8000/admin/logout',
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('adminToken')}`,
                    },
                },
            )
            .then(function (response) {
                if (response.data.success) {
                    Cookies.remove('adminToken', { path: '/' });
                    window.location.href = 'http://127.0.0.1:4000/login';
                }
                else {
                    console.log(response);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className={styles.divRight}>
            <ul className={styles.rightList}>
                <li className={styles.account}>
                    <img src={user.avatar} alt="avatar" />{user.userName}
                    <FaAngleDown fontSize={12} />
                    <ul className={styles.dropDown}>
                        <li>
                            <Link to="/my-account"><FaTachometerAlt /> Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/change-information"><FaCubes />Change Information</Link>
                        </li>
                        <li>
                            <button onClick={handleLogout}><FaSignOutAlt /> Log out</button>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}

export default TopHeaderRightAuth
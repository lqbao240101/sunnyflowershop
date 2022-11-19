import styles from './CustomerAccountDetails.module.scss'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react'
import axios from '../../../service/axiosClient'
import Cookies from 'js-cookie';

function CustomerAccountDetails() {

    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');
    const [subscribe, setSubscribe] = useState('');

    useEffect(() => {
        axios
            .get(`http://localhost:8000/customer/profile`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            })
            .then((response) => {
                setFirstName(response.data.data.first_name);
                setLastName(response.data.data.last_name);
                setEmail(response.data.data.email);
                setAvatar(response.data.data.avatar)
                setSubscribe(response.data.data.subscribe);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    const handleSubcribe = () => {
        if (subscribe === true) {
            axios
                .patch(`http://localhost:8000/customer/unsubscribe`, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`,
                    },
                })
                .then(response => {
                    if (response.data.success) {
                        setSubscribe(!subscribe);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            axios
                .patch(`http://localhost:8000/customer/subscribe`, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`,
                    },
                })
                .then(response => {
                    if (response.data.success) {
                        console.log(response);
                        setSubscribe(!subscribe);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    return (
        <div className={styles.myaccountContent}>
            <div className={`justify-content-between mt-3 d-flex align-items-center`}>
                <h4 className={styles.title}>Account details</h4>
                <Link to="/account-edit" className='theme-btn-one bg-black btn_sm'>UPDATE ACCOUNT</Link>
            </div>
            <div >
                <div className={styles.accountDetailsForm}>
                    <form>
                        <div className={styles.imgProfiles}>
                            <img src={avatar} alt="img" />
                        </div>
                        <div className={styles.defaultFormBox}>
                            <label>First Name</label>
                            <input type="text" name="first-name" value={firstName} className='form-control' disabled />
                        </div>
                        <div className={styles.defaultFormBox}>
                            <label>Last Name</label>
                            <input type="text" name="last-name" value={lastName} className='form-control' disabled />
                        </div>
                        <div className={styles.defaultFormBox}>
                            <label>Email</label>
                            <input type="text" name="email-name" value={email} className='form-control' disabled />
                        </div>
                        <label className="mt-4" htmlFor="newsletter">
                            <input type="checkbox" id="newsletter" onChange={handleSubcribe} checked={subscribe === true ? true : false}/>
                            <span className="ml-2">Sign up for our newsletter</span>
                            <p className="mt-2 text-secondary">You may unsubscribe at any moment. For that purpose, please find our contact info in the legal notice.</p>
                        </label>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CustomerAccountDetails
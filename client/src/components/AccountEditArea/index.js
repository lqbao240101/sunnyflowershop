import styles from './AccountEditArea.module.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaCamera } from 'react-icons/fa';
import BaoAvatar from '../../images/Bao_avatar.jpg';
import axios from '../../service/axiosClient';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useForm } from "react-hook-form";
import AccountEditModal from './AccountEditModal';

function AccountEditArea() {

    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            first_name: firstName,
            last_name: lastName,
            email: email,
            avatar: avatar
        }
    });
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState('');

    const { register: register2, handleSubmit: handleSubmit2, formState: { errors: errors2 }, reset: reset2 } = useForm();

    const { register: register3, handleSubmit: handleSubmit3, formState: { errors: errors3 } } = useForm();
    // const regExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    useEffect(() => {
        axios
            .get(`http://localhost:8000/customer/shortProfile`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            })
            .then((response) => {
                if (response.data.success) {
                    reset(response.data.data);
                    setFirstName(response.data.data.first_name);
                    setLastName(response.data.data.last_name);
                    setEmail(response.data.data.email);
                }
            })
            .catch(function (error) {
                console.log(error);
            });

        axios
            .get(`http://localhost:8000/customer/avatar`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            })
            .then((response) => {
                if (response.data.success) {
                    setAvatar(response.data.avatar)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    const handleUpdateInformation = (data) => {
        axios
            .patch(`http://localhost:8000/customer/updateInformation`, data, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            })
            .then(function (response) {
                if (response.data.success) {
                    setSuccess(response.data.success)
                    setMessage(response.data.message)
                } else {
                    setSuccess(response.data.success)
                    setMessage(response.data.message);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const handleUpdatePassword = (data) => {
        axios
            .patch(`http://localhost:8000/customer/updatePassword`, data, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            })
            .then(function (response) {
                if (response.data.success) {
                    setSuccess(response.data.success)
                    setMessage(response.data.message)
                    reset2()
                } else {
                    setSuccess(response.data.success)
                    setMessage(response.data.message);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleImage = (e) => {
        const file = e.target.files[0];

        const Reader = new FileReader();

        Reader.readAsDataURL(file);

        Reader.onload = () => {
            if (Reader.readyState === 2) {
                setAvatar(Reader.result);

            }
        };
    }

    const handleUpdateAvatar = (data) => {

        const payload = {
            ...data,
            avatar: avatar,

        }
        console.log(payload)
        axios
            .patch(`http://localhost:8000/customer/updateAvatar`, payload, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            })
            .then(function (response) {
                if (response.data.success) {
                    setSuccess(response.data.success)
                    setMessage(response.data.message)
                } else {
                    setSuccess(response.data.success)
                    setMessage(response.data.message);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <section id={styles.accountEdit} className='ptb100'>
            <Container fluid>
                <Row>
                    <Col lg={6}>
                        <div className={styles.backBtn}>
                            <Link to='/my-account/customer-account-details'><FaArrowLeft /> Back to Dashboard</Link>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={3}>
                        <div className={styles.accountThumd}>
                            <form onSubmit={handleSubmit3(handleUpdateAvatar)}>
                                <div className={styles.accountThumbImg}>
                                    <img src={avatar} alt="img" />
                                    <div className={styles.fixedIcon}>
                                        <input
                                            className="FormInput"
                                            type="file"
                                            accept='image/*'
                                            placeholder="First name"
                                            {...register3("avatar", { onChange: handleImage })}
                                        /><FaCamera />
                                    </div>
                                </div>
                                <div className='m-4 mx-auto'>
                                    <AccountEditModal nameBtn='Update Avatar' message={message} success={success} />
                                </div>
                            </form>
                        </div>
                    </Col>
                    <Col lg={9}>
                        <div className={styles.accountSetting}>
                            <div className={styles.accountSettingHeading}>
                                <h2>Account Details</h2>
                                <p>Edit your account settings and change your password here.</p>
                            </div>
                            <form onSubmit={handleSubmit(handleUpdateInformation)} id='accountEditFormInformation' className={styles.accountEditForm}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="first_name">First Name</label>
                                    <input
                                        className="FormInput"
                                        type="text"
                                        placeholder="First name"
                                        {...register("first_name", { required: true, minLength: 2, maxLength: 50, onChange: (e) => { setFirstName(e.target.value) } })}
                                    />
                                    {errors["first_name"] && (
                                        <p className="checkInput">Invalid First Name!</p>
                                    )}
                                    <label htmlFor="last_name">Last Name</label>
                                    <input
                                        className="FormInput"
                                        type="text"
                                        placeholder="Last name"
                                        {...register("last_name", { required: true, minLength: 2, maxLength: 50, onChange: (e) => { setLastName(e.target.value) } })}
                                    />
                                    {errors["last_name"] && (
                                        <p className="checkInput">Invalid Last Name!</p>
                                    )}
                                    <label htmlFor="email">Email</label>
                                    <input
                                        className="FormInput"
                                        type="text"
                                        placeholder="Username or Email"
                                        {...register("email", { required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, onChange: (e) => { setEmail(e.target.value) } })}
                                    />
                                    {errors["email"] && (
                                        <p className="checkInput">Invalid Email!</p>
                                    )}
                                </div>
                                <AccountEditModal nameBtn='Update Information' message={message} success={success} />
                            </form>
                            <form onSubmit={handleSubmit2(handleUpdatePassword)} id='accountEditFormPassword' className={styles.accountEditForm}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="password">Current Password
                                        <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        className="FormInput"
                                        type="password"
                                        placeholder="Password"
                                        {...register2("password", { required: true, minLength: 6, maxLength: 24 })}
                                    />
                                    {errors2["password"] && (
                                        <p className="checkInput">Password must be at least 6 characters and max 24 characters long</p>
                                    )}
                                    <label htmlFor="newPassword">New Password</label>
                                    <input
                                        className="FormInput"
                                        type="password"
                                        placeholder="New password"
                                        {...register2("newPassword", { required: true, minLength: 6, maxLength: 24 })}
                                    />
                                    {errors2["newPassword"] && (
                                        <p className="checkInput">Password must be at least 6 characters and max 24 characters long</p>
                                    )}
                                    <label htmlFor="confirmNewPassword">Confirm New Password</label>
                                    <input
                                        className="FormInput"
                                        type="password"
                                        placeholder="Confirm new password"
                                        {...register2("confirmNewPassword", { required: true, minLength: 6, maxLength: 24 })}
                                    />
                                    {errors2["confirmNewPassword"] && (
                                        <p className="checkInput">Those passwords didn't match. Try again.</p>
                                    )}
                                </div>
                                <AccountEditModal nameBtn='Update Password' message={message} success={success} />
                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section >
    )
}

export default AccountEditArea;
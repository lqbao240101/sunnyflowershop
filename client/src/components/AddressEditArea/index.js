import styles from './AddressEditArea.module.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import 'react-phone-number-input/style.css';
import '../RegisterArea/PhoneInput.css';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function AddressEditArea({ id, stt }) {
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [streetName, setStreetName] = useState('');
    const [district, setDistrict] = useState('');
    const [ward, setWard] = useState('');
    const [city, setCity] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const { register, handleSubmit, watch, formState: { errors }, control, reset } = useForm({
        defaultValues: {
            first_name_receiver: firstName,
            last_name_receiver: lastName,
            streetName: streetName,
            district: district,
            ward: ward,
            city: city,
            phone_receiver: phoneNumber,
        }
    });
    useEffect(() => {
        axios
            .get(`http://localhost:8000/address/${id}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            })
            .then((response) => {
                if (response.data.success) {
                    setFirstName(response.data.data.first_name_receiver)
                    reset(response.data.data);
                    // reset(response.data)

                    setLastName(response.data.data.last_name_receiver)
                    // reset(response.data.data.last_name_receiver);

                    setStreetName(response.data.data.x)
                    // reset(response.data.data.street_name);

                    setDistrict(response.data.data.district)
                    // reset(response.data.data.district);

                    setWard(response.data.data.ward)
                    // reset(response.data.data.ward);

                    setCity(response.data.data.city)
                    // reset(response.data.data.city);

                    setPhoneNumber(response.data.data.phone_receiver)

                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [id]);

    const handleValidate = (value) => {
        const isValid = isValidPhoneNumber(value);
        return isValid
    }

    const onSubmit = (data) => {
        console.log(data)
        axios
            .put(`http://localhost:8000/address/${id}/update`, data,
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`,
                    }
                },
            )
            .then((response) => {
                alert('chạy rồi nè hehe')
            })
    }

    return (
        <section id={styles.addressEdit} className='ptb100'>
            <Container>
                <Row>
                    <Col lg={6}>
                        <div className={styles.backBtn}>
                            <Link to='/my-account/customer-address'><FaArrowLeft /> Back to Dashboard</Link>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={{ span: 6, offset: 3 }} md={12} sm={12} xs={12}>
                        <div className={styles.addressForm}>
                            <h2>Shipping Address #{stt + 1}</h2>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="firstNameReceiver">First Name Receiver</label>
                                    <input
                                        className="FormInput"
                                        type="text"
                                        {...register("first_name_receiver", { required: true, onChange: (e) => { setFirstName(e.target.value) } })} />
                                    {errors.firstNameReceiver?.type && <span className='error'>Không được bỏ trống mục này</span>}
                                    <label htmlFor="lastNameReceiver">Last Name Receiver</label>
                                    <input
                                        className="FormInput"
                                        type="text"
                                        {...register("last_name_receiver", { required: true, onChange: (e) => { setLastName(e.target.value) } })} />
                                    {errors.lastNameReceiver?.type && <span className='error'>Không được bỏ trống mục này</span>}

                                    <label htmlFor="streetName">Street name</label>
                                    <input
                                        className="FormInput"
                                        type="text"
                                        {...register("street_name", { required: true, onChange: (e) => { setStreetName(e.target.value) } })} />
                                    {errors.streetNameReceiver?.type && <span className='error'>Không được bỏ trống mục này</span>}
                                    <label htmlFor="district">District</label>
                                    <input
                                        className="FormInput"
                                        type="text"
                                        {...register("district", { required: true, onChange: (e) => { setDistrict(e.target.value) } })} />
                                    {errors.district?.type && <span className='error'>Không được bỏ trống mục này</span>}
                                    <label htmlFor="ward">Ward</label>
                                    <input
                                        className="FormInput"
                                        type="text"
                                        {...register("ward", { required: true, onChange: (e) => { setWard(e.target.value) } })} />
                                    {errors.ward?.type && <span className='error'>Không được bỏ trống mục này</span>}
                                    <label htmlFor="city">City</label>
                                    <input
                                        className="FormInput"
                                        type="text"
                                        {...register("city", { required: true, onChange: (e) => { setCity(e.target.value) } })} />
                                    {errors.city?.type && <span className='error'>Không được bỏ trống mục này</span>}
                                    <label htmlFor="phoneNumber">Phone Receiver</label>

                                    <Controller
                                        name="phone_receiver"
                                        control={control}
                                        rules={{
                                            validate: (value) => isValidPhoneNumber(value.toString())
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <PhoneInput
                                                value={phoneNumber.toString()}
                                                onChange={onChange}
                                                defaultCountry="VN"
                                                id="phone_receiver" />)} />
                                </div>
                                <button type='submit' className='theme-btn-one bg-black btn_sm'>Update Address</button>
                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default AddressEditArea;
import styles from './Footer.module.scss'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGoogle } from "react-icons/fa"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Logo from '../../images/Logo.png';
import { useForm } from "react-hook-form";

function Footer() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log({ data })
    };

    return (
        <footer>
            <Container>
                <Row>
                    <Col lg={4} md={12} sm={12} xs={12}>
                        <div className={styles.footerLeft}>
                            <a href="">
                                <img src={Logo} alt="logo" width={200} />
                            </a>
                            <p><strong>Huong Duong Shop</strong> is a fashion company. Sunny flower shop specializes in providing backpacks and book bags for all ages.</p>
                            <div className={styles.divFooterIcon}>
                                <ul>
                                    <li>
                                        <FaFacebookF fontSize={18} />
                                    </li>
                                    <li>
                                        <FaTwitter fontSize={18} />
                                    </li>
                                    <li>
                                        <FaInstagram fontSize={18} />
                                    </li>
                                    <li>
                                        <FaLinkedinIn fontSize={18} />
                                    </li>
                                    <li>
                                        <FaGoogle fontSize={18} />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Col>
                    <Col lg={3} md={6} sm={12} xs={12}>
                        <div className={styles.footerRow}>
                            <h3>INFORMATION</h3>
                            <ul>
                                <li> Home </li>
                                <li>Privacy Policy</li>
                                <li>Frequently Questions</li>
                                <li>Order Tracking</li>
                            </ul>
                        </div>
                    </Col>
                    <Col lg={3} md={6} sm={12} xs={12}>
                        <div className={styles.footerRow}>
                            <h3>ABOUT US</h3>
                            <ul>
                                <li>TP HCM</li>
                                <li>0395115641</li>
                                <li>COMING SOON</li>
                                <li>huongduongshop@gmail.com</li>
                                <li></li>
                            </ul>
                        </div>
                    </Col>
                    <Col lg={2} md={12} sm={12} xs={12}>
                        <div className={styles.footerRow}>
                            <h3>NEWSLETTER</h3>
                            <div className={styles.divForm}>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div>
                                        <input
                                            className="FormInput"
                                            type="text"
                                            placeholder="Email"
                                            {...register("email-input", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })}
                                        />
                                        {errors["email-input"] && (
                                            <p className="checkInput">Invalid Email!</p>
                                        )}
                                    </div>
                                    <div>
                                        <button className={styles.btnSendMail} type='submit' name='subscribe'>SEND MAIL</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
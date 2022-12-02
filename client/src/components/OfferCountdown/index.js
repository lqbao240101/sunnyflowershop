import { useState, useEffect, useRef } from 'react'
import styles from './OfferCountdown.module.scss'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { Link } from 'react-router-dom';

function OfferCountdown() {

    const [timeDays, setDays] = useState('00');
    const [timeHours, setHours] = useState('00');
    const [timeMinutes, setMinutes] = useState('00');
    const [timeSeconds, setSeconds] = useState('00');
    const [name, setName] = useState('');
    const [discount, setDiscount] = useState(0)
    const [check, setCheck] = useState(false)

    let interval = useRef();

    const startCountDown = (date) => {
        const countDownDate = new Date(date).getTime();

        interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = countDownDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor(distance % (1000 * 60) / 1000);

            if (distance < 0) {
                clearInterval(interval.current);
            } else {
                setDays(days);
                setHours(hours);
                setMinutes(minutes);
                setSeconds(seconds);
            }
        }, 1000);
    }

    useEffect(() => {
        axios
            .get(`http://localhost:8000/voucher/countDown`)
            .then((response) => {
                if (response.data.success) {
                    if (response.data.data) {
                        console.log(response.data)
                        setName(response.data.data.name)
                        setDiscount(response.data.data.percent)
                        startCountDown(response.data.data.effective_date);
                        return () => {
                            clearInterval(interval.current);
                        }
                    }
                    else {
                        setCheck(true)
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])

    return (
        <section id={styles.offerTime}>
            <Container>
                <Row className={styles.row}>
                    <Col className={`${styles.col}`} lg={{ span: 8, offset: 4 }} md={{ span: 7, offset: 4 }} sm={12} xs={12}>
                        <div className={`${styles.offerTimeFlex}`}>
                            <div className={styles.countDown}>
                                <div>
                                    <ul>
                                        <li>
                                            <span>{timeDays}</span> days
                                        </li>
                                        <li>
                                            <span>{timeHours}</span> Hours
                                        </li>
                                        <li>
                                            <span>{timeMinutes}</span> Minutes
                                        </li>
                                        <li>
                                            <span>{timeSeconds}</span> Seconds
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className={styles.offerTimeText}>
                                {((timeDays !== '00' || timeHours !== '00' || timeMinutes !== '00' || timeSeconds !== '00') && check === false) && <>
                                    <h2>VOUCHER WILL BE AVAILABLE SOON!</h2>
                                    <p>Exciting promotions coming up.</p>
                                </>
                                }
                                {(timeDays === '00' && timeHours === '00' && timeMinutes === '00' && timeSeconds === '00' && check === false) && <>

                                    <h2>{name} - {discount}%</h2>
                                    <p>Use this voucher to get discount</p>
                                    <Link to="/shop">SHOP NOW</Link>
                                </>}
                                {check === true && <><h2>
                                    THERE ARE CURRENTLY NO PROMOTIONS GOING ON
                                </h2>
                                    <p>COMING SOON</p>
                                </>}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section >
    )
}

export default OfferCountdown
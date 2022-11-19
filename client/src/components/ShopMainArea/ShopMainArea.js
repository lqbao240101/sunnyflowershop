import styles from './ShopMainArea.module.scss'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { GoSearch } from "react-icons/go";
import { useEffect, useState } from 'react'
import { products } from '../HotProduct/ProductWrapper/products';
import { formatter } from '../../utils/utils'
import Cookies from 'js-cookie';
import { useForm } from "react-hook-form";
import axios from '../../service/axiosClient';
import ListProduct from './ListProduct/ListProduct';

function ShopMainArea() {

    const [search, setSearch] = useState('');
    const [listCategories, setListCategories] = useState([])
    const [category, setCategory] = useState([]);
    const [price, setPrice] = useState(100000);
    const [listAPI, setListAPI] = useState([]);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    useEffect(() => {
        axios
            .get(`http://localhost:8000/product/`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            })
            .then((response) => {
                setListAPI(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);



    //gọi api để trả về sản phẩm theo filter

    // useEffect(() => {
    //     axios
    //         .get(`http://localhost:8000/product/`, {
    //             headers: {
    //                 Authorization: `Bearer ${Cookies.get('token')}`,
    //             },
    //         })
    //         .then((response) => {
    //             setListCategories(response.data.data);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }, []);

    const handlePriceFilter = (e) => {
        setPrice(e.target.value);
    }
    const categoryFilter = (e) => {
        if (category.includes(e.target.value)) {
            setCategory(category.filter(item => item !== e.target.value))
            console.log(category)
        } else {
            setCategory([...category, e.target.value])
        }
    }
    useEffect(() => {
        axios
            .get(`http://localhost:8000/category/`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            })
            .then((response) => {
                setListCategories(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    })


    // useEffect(() => {
    //     let List = products;

    //     if (search !== "") {
    //         List = List.filter(product => { return product.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) })
    //     }

    //     List = List.filter(product => { return product.discount !== "" ? product.cost * ((100 - product.discount) / 100) >= price : product.cost >= price })

    //     if (category !== "ALL") {
    //         List = List.filter(product => { return product.category === category })
    //     }

    //     setListProduct(List);
    // }, [price, search, category])

    return (
        <section id={styles.shopMainArea}>
            <Container fluid>
                <Row>
                    <Col lg={3}>
                        <div className={styles.shopSidebarWrapper}>
                            <div className={styles.shopSearch}>
                                <form>
                                    <input value={search} className="form-control" placeholder="Search..."
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                    <button type="">
                                        <GoSearch />
                                    </button>
                                </form>
                            </div>
                            <div className={styles.shopSidebarBoxed}>
                                <h4>Product Categories</h4>
                                <form>
                                    {listCategories.map((category) => {
                                        return (
                                            <div className='checkbox_group' key={category._id}>
                                                <input
                                                    id='Caterory'
                                                    type='checkbox'
                                                    value={category.name}
                                                    className='check_box'
                                                    {...register("category", { onChange: (e) => { categoryFilter(e) } })}
                                                />
                                                <p>{category.name}</p>
                                            </div>)
                                    })}
                                </form>
                            </div>
                            <div className={styles.shopSidebarBoxed}>
                                <h4>Price</h4>
                                <div className={styles.priceFilter}>
                                    <input id={styles.formControlRange} type="range" onInput={handlePriceFilter} min="100000" max="500000" value={price} />
                                    <div className={styles.price}>
                                        <span>Price: {formatter.format(price)}</span>
                                    </div>
                                </div>
                            </div>
                            {/* <div className={styles.clearButton}>
                                <button type="button" onClick={handleClear}>CLEAR FILTER</button>
                            </div> */}
                        </div>
                    </Col>
                    <Col lg={9}>
                        <ListProduct currentItems={listAPI} />
                    </Col>
                </Row>
            </Container>
        </section >
    )
}

export default ShopMainArea
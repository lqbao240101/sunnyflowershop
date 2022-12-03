import styles from './ShopMainArea.module.scss'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { GoSearch } from "react-icons/go";
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import { formatter } from '../../utils/utils'
import Cookies from 'js-cookie';
import { useForm } from "react-hook-form";
import axios from '../../service/axiosClient';
import ListProduct from './ListProduct/ListProduct';
import stylesPaginated from '../usePagination/PaginatedItems.module.scss'

function ShopMainArea() {
    const [searchParams] = useSearchParams();
    const [listProduct, setListProduct] = useState()
    const [search, setSearch] = useState('');
    const [listCategories, setListCategories] = useState([])
    const [category, setCategory] = useState('');
    const { register, handleSubmit } = useForm();
    const { register: register2 } = useForm();


    const [data, setData] = useState({
        data: [],
        page: 0,
        nextPage: 0,
        prevPage: 0,
        lastPage: 0,
        total: 0,
    });

    useEffect(() => {
        axios
            .get(`http://localhost:8000/product/?${searchParams.toString()}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('adminToken')}`,
                },
            })

            .then((response) => {
                setData({
                    data: response.data.data,
                    total: response.data.total,
                    page: response.data.meta.current_page,
                    lastPage: response.data.meta.last_page,
                    nextPage: response.data.meta.current_page + 1,
                    prevPage: response.data.meta.current_page - 1,
                });
                console.log('bắt đầu lấy')
            });
    }, [searchParams.toString()]);

    const handleSearch = (data) => {
        const payload = {
            ...data,
            category: category,
            min: '',
            max: ''
        }
        axios
            .post(`http://localhost:8000/product/search`, payload, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            })
            .then((response) => {
                setData({
                    data: response.data.data
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    useEffect(() => {
        setListProduct(data)
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
    }, [])

    return (
        <section id={styles.shopMainArea}>
            <Container fluid>
                <Row>
                    <Col lg={3}>
                        <div className={styles.shopSidebarWrapper}>
                            <div className={styles.shopSearch}>
                                <form onSubmit={handleSubmit(handleSearch)}>
                                    <input
                                        value={search}
                                        className="form-control"
                                        placeholder="Search..."
                                        {...register('name', { onChange: (e) => setSearch(e.target.value) })}
                                    />
                                    <button type="submit">
                                        <GoSearch />
                                    </button>
                                </form>
                            </div>
                            <div className={styles.shopSidebarBoxed}>
                                <h4>Product Categories</h4>
                                <form>
                                    <div className='checkbox_group' key={category._id}>
                                        <input
                                            id='Caterory'
                                            type='radio'
                                            value="None"
                                            className='check_box'
                                            {...register2("category", { onChange: (e) => { setCategory('') } })}
                                        />
                                        <p>None</p>
                                    </div>
                                    {listCategories.map((category) => {
                                        return (
                                            <div className='checkbox_group' key={category._id}>
                                                <input
                                                    id='Caterory'
                                                    type='radio'
                                                    value={category._id}
                                                    className='check_box'
                                                    {...register2("category", { onChange: (e) => { setCategory(e.target.value) } })}
                                                />
                                                <p>{category.name}</p>
                                            </div>)
                                    })}
                                </form>
                            </div>
                        </div>
                    </Col>
                    <Col lg={9}>
                        <ListProduct currentItems={data.data} />
                        < Col lg={12}>
                            <ul className={stylesPaginated.pagination}>
                                {data.page > 1 && <li className={stylesPaginated.pageItem}>
                                    <Link to={`?page=${data.prevPage}`} className={stylesPaginated.pageLink}>«</Link>
                                </li>}
                                {(data.page > 4) && <li className={stylesPaginated.pageItem}>
                                    <Link to={`?page=${1}`} className={stylesPaginated.pageLink}>1</Link>
                                </li>}
                                {(data.page > 4) && < li className={`${stylesPaginated.pageItem} ${stylesPaginated.disable}`}>
                                    <Link className={stylesPaginated.pageLink}>...</Link>
                                </li>}
                                {data.page - 1 > 0 && <li className={stylesPaginated.pageItem}>
                                    <Link to={`?page=${data.prevPage}`} className={stylesPaginated.pageLink}>{data.page - 1}</Link>
                                </li>}
                                <li className={`${stylesPaginated.pageItem} ${stylesPaginated.active}`}>
                                    <Link to={`?page=${data.page}`} className={stylesPaginated.pageLink}>{data.page}</Link>
                                </li>
                                {(data.page !== data.lastPage && data.page > 3) && <li className={stylesPaginated.pageItem}>
                                    <Link to={`?page=${data.nextPage}`} className={stylesPaginated.pageLink}>{data.page + 1}</Link>
                                </li>}
                                {(data.page >= 2 && data.page < 4) && <li className={stylesPaginated.pageItem}>
                                    <Link to={`?page=${data.page + 1}`} className={stylesPaginated.pageLink}>{data.page + 1}</Link>
                                </li>}
                                {(data.page !== data.lastPage && data.page > 3) && <li className={`${stylesPaginated.pageItem} ${stylesPaginated.disable}`}>
                                    <Link className={stylesPaginated.pageLink}>...</Link>
                                </li>}
                                {(data.page !== data.lastPage && data.page > 3) && <li className={stylesPaginated.pageItem}>
                                    <Link to={`?page=${data.lastPage}`} className={stylesPaginated.pageLink}>{data.lastPage}</Link>
                                </li>}
                                {(data.page !== data.lastPage && data.page > 1) && <li className={stylesPaginated.pageItem}>
                                    <Link to={`?page=${data.nextPage}`} className={stylesPaginated.pageLink}>»</Link>
                                </li>}
                            </ul>
                        </Col>
                    </Col>

                </Row>
            </Container>
        </section >
    )
}

export default ShopMainArea
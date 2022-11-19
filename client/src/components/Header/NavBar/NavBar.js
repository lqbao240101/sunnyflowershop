import React, { useState, useRef } from 'react'
import { FaBars, FaTimes } from "react-icons/fa"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import LogoSrc from '../../../images/Logo.png'
import { HomeDropDown, FeatureDropDown, ShopDropDown, BlogDropDown, PagesDropDown } from './NavBarItems.js'
import "./NavBar.css";
import { Link, } from 'react-router-dom';
import { FaHeart, FaShoppingBag, FaSearch } from "react-icons/fa";
import DropDown from "./Dropdown.js";

function NavBar() {
  const [HomeDropdown, setHomeDropdown] = useState(false)
  const [ShopDropdown, setShopDropdown] = useState(false)
  const [FeatureDropdown, setFeatureDropdown] = useState(false)
  const [BlogDropdown, setBlogDropdown] = useState(false)
  const [PageDropdown, setPagesDropdown] = useState(false)

  const navRef = useRef();

  const ShowNavBar = () => {
    navRef.current.classList.toggle("responsive_nav")
  }
  return (
    < nav className='NavBar' >
      <Container>
        <Row>
          <Col lg={12} className='d-flex align-items-center justify-content-between'>
            <div className='header-logo'>
              <div className='logo'>
                <a href=".">
                  < img src={LogoSrc} alt="" className="Logo" />
                </a>
              </div>
            </div>
            <ul className='nav-item-ul'
              ref={navRef}>
              <li
                className='nav-item'
                onMouseEnter={() => setHomeDropdown(true)}
                onMouseLeave={() => setHomeDropdown(false)}
              >
                <Link to='./'>Home</Link>
                <DropDown
                  className={`${HomeDropdown ? 'active' : 'dropdown'}`}
                  nameDropDown={HomeDropDown} />
              </li>
              <li
                className='nav-item'
                onMouseEnter={() => setShopDropdown(true)}
                onMouseLeave={() => setShopDropdown(false)}
              >
                <Link to='/Shop'>Shop</Link>
                <DropDown
                  className={`${ShopDropdown ? 'active' : 'dropdown'}`}
                  nameDropDown={ShopDropDown} />
              </li>
              <li
                className='nav-item'
                onMouseEnter={() => setFeatureDropdown(true)}
                onMouseLeave={() => setFeatureDropdown(false)}
              >
                <Link to='./Feature' >Feature</Link>
                <DropDown className={`${FeatureDropdown ? 'active' : 'dropdown'}`}
                  nameDropDown={FeatureDropDown} />
              </li>
              <li
                className='nav-item'
                onMouseEnter={() => setBlogDropdown(true)}
                onMouseLeave={() => setBlogDropdown(false)}
              >
                <Link to='./Blog'>Blog</Link>
                <DropDown className={`${BlogDropdown ? 'active' : 'dropdown'}`}
                  nameDropDown={BlogDropDown} />
              </li>
              <li
                className='nav-item'
                onMouseEnter={() => setPagesDropdown(true)}
                onMouseLeave={() => setPagesDropdown(false)}
              >
                <Link to='./Page'>Page</Link>
                <DropDown className={`${PageDropdown ? 'active' : 'dropdown'}`}
                  nameDropDown={PagesDropDown} />
              </li>
              <button
                className='nav-btn nav-close-btn'
                onClick={ShowNavBar}
              >
                <FaTimes />
              </button>
            </ul>
            <ul className="ActionNavBar">
              <li> <Link to='/wishlist'><FaHeart fontSize={21} /></Link></li>
              <li> <Link to='/cart'><FaShoppingBag fontSize={21} /></Link></li>
              {/* <li> <Link to={ }><FaSearch fontSize={21} /></Link></li> */}
              <button
                className='nav-btn'
                onClick={ShowNavBar}
              >
                <FaBars fontSize={21} />
              </button>
            </ul>
          </Col>
        </Row>
      </Container>
    </nav >
  )
}
export default NavBar
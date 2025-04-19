import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./navbar.css"
import { AiFillCloseCircle } from 'react-icons/ai'
import { TbGridDots } from 'react-icons/tb'
import logo from '../../Assets/LOGOO.png'

const Navbar = () => {
  const [active, setActive] = useState('navBar')

  const showNav = () => {
    setActive('navBar activeNavBar')
  }

  const removeNav = () => {
    setActive('navBar')
  }

  return (
    <section className='navBarSection'>
      <header className='header'>
        <div className='logoDiv'>
          <Link to="/" className='logo'>
            <img src={logo} alt="New Alghani" className="logo-img"/>
          </Link>
        </div>

        <div className={active}>
          <ul className="navLists">
            <li className="navItem">
              <Link to="/" className="navLink">Home</Link>
            </li>
            <li className="navItem">
              <Link to="/packages" className="navLink">Packages</Link>
            </li>
            <li className="navItem">
              <Link to="/pages" className="navLink">Pages</Link>
            </li>
            <li className="navItem">
              <Link to="/contact" className="navLink">Contact Us</Link>
            </li>
            <button className="btn">
              <Link to="/login">Login/Signup</Link>
            </button>
          </ul>

          <div onClick={removeNav} className="closeNavBar">
            <AiFillCloseCircle />
          </div>
        </div>

        <div onClick={showNav} className="toggleNavBar">
          <TbGridDots />
        </div>
      </header>
    </section>
  )
}

export default Navbar

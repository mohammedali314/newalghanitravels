import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./navbar.css"
import { AiFillCloseCircle } from 'react-icons/ai'
import { TbGridDots } from 'react-icons/tb'
import logo from '../../Assets/LOGOO.png'
import AuthModal from '../Auth/AuthModal'

const Navbar = () => {
  const [active, setActive] = useState('navBar')
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  const showNav = () => {
    setActive('navBar activeNavBar')
  }

  const removeNav = () => {
    setActive('navBar')
  }

  return (
    <>
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
                <Link to="/testimonials" className="navLink">Testimonials</Link>
              </li>
              <li className="navItem">
                <Link to="/team" className="navLink">Our Team</Link>
              </li>
              <li className="navItem">
                <Link to="/contact" className="navLink">Contact</Link>
              </li>
              <button className="btn" onClick={() => setIsAuthModalOpen(true)}>
                Login/Signup
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

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  )
}

export default Navbar

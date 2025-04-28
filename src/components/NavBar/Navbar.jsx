import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./navbar.css"
import { AiFillCloseCircle } from 'react-icons/ai'
import { TbGridDots } from 'react-icons/tb'
import logo from '../../Assets/LOGOO.png'
import AuthModal from '../Auth/AuthModal'

const Navbar = () => {
  const [active, setActive] = useState('navBar')
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const showNav = () => {
    setActive('navBar activeNavBar')
  }

  const removeNav = () => {
    setActive('navBar')
  }

  const handleLogout = () => {
    localStorage.clear();
    setDropdown(false);
    navigate('/');
  };

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
              {!user ? (
                <button className="btn" onClick={() => setIsAuthModalOpen(true)}>
                  Login/Signup
                </button>
              ) : (
                <div className="profile-nav" onClick={() => setDropdown(!dropdown)} style={{position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <div className="avatar-circle" style={{width: 38, height: 38, borderRadius: '50%', backgroundImage: `url(https://cdn-icons-png.flaticon.com/512/1144/1144760.png)`, backgroundSize: '80%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  </div>
                  {dropdown && (
                    <div className="profile-dropdown" style={{position: 'absolute', right: 0, top: 48, background: '#fff', borderRadius: 10, boxShadow: '0 4px 16px rgba(30,41,59,0.10)', padding: '1rem', minWidth: 180, zIndex: 10, display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                      <div className="profile-name" style={{fontWeight: 700, color: '#2563eb'}}>
                        {user?.name || user?.username || 'Agent'}
                      </div>
                      <div className="profile-email" style={{fontSize: '0.95rem', color: '#64748b', marginBottom: '0.5rem'}}>{user?.email}</div>
                      <button onClick={() => { setDropdown(false); navigate('/'); }} style={{background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, padding: '0.5rem 1rem', marginTop: '0.3rem', cursor: 'pointer', fontWeight: 600}}>Agent</button>
                      <button onClick={handleLogout} style={{background: '#ef4444', color: '#fff', border: 'none', borderRadius: 6, padding: '0.5rem 1rem', marginTop: '0.3rem', cursor: 'pointer', fontWeight: 600}}>Logout</button>
                    </div>
                  )}
                </div>
              )}
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
        setUser={() => {}}
      />
    </>
  )
}

export default Navbar

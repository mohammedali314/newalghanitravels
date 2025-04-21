import React from 'react'
import './footer.scss'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa'
import Logo from "../../Assets/LOGOO.png"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footerContent container">
        <div className="footerTop">
          <div className="footerLogo">
            <img src={Logo} alt="Alghani Travels Logo" />
            <p>Your trusted partner in travel</p>
          </div>
          <div className="footerLinks">
             <div className="linkGroup">
              <h3> Quick Links</h3>
              <ul>
                <li><a href="/contact">Home</a></li>
                <li><a href="/faq">About US</a></li>
                <li><a href="/terms">Testimonials</a></li>
                <li><a href="/privacy">Our Team</a></li>
                <li><a href="/refund">Contact Us</a></li>
              </ul>
            </div>
            
            <div className="linkGroup">
              <h3>Services</h3>
              <ul>
                <li><a href="/business">Business Travel</a></li>
                <li><a href="/group">Group Travel</a></li>
                <li><a href="/umrah">Umrah Packages</a></li>
                <li><a href="/visa">Visa Services</a></li>
                <li><a href="/insurance">Travel Insurance</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footerBottom">
          <div className="contactInfo">
            <div className="contactItem">
              <FaMapMarkerAlt className="icon" />
              <p>Shop No.69,70 3 Star Market,Karianwala,Gujrat</p>
            </div>
            <div className="contactItem">
              <FaPhone className="icon" />
              <p>+92 301 6262050</p>
            </div>
            <div className="contactItem">
              <FaEnvelope className="icon" />
              <p>info@newalghanitravels.com</p>
            </div>
          </div>

          <div className="mapContainer">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.365714357302!2d74.3587!3d31.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDMxJzEzLjQiTiA3NMKwMjEnMzEuMyJF!5e0!3m2!1sen!2s!4v1234567890"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <div className="socialLinks">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
        </div>

        <div className="copyright">
          <p>&copy; {new Date().getFullYear()} New Alghani Travels. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

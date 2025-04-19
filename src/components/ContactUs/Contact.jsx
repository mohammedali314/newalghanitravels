import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import './contact.scss';

const Contact = () => {
  
  <h1>Coming SOOON</h1>
  // const [formData, setFormData] = useState({
  //   name: '',
  //   email: '',
  //   subject: '',
  //   message: ''
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData(prev => ({
  //     ...prev,
  //     [name]: value
  //   }));
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Handle form submission here
  //   console.log(formData);
  // };

  // return (
  //   <div className="contact-container">
  //     <div className="contact-header">
  //       <h1>Contact Us</h1>
  //       <p>Get in touch with us for any inquiries or support</p>
  //     </div>

  //     <div className="contact-content">
  //       <div className="contact-info">
  //         <div className="info-card">
  //           <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
  //           <h3>Our Location</h3>
  //           <p>123 Business Street, City, Country</p>
  //         </div>
          
  //         <div className="info-card">
  //           <FontAwesomeIcon icon={faPhone} className="icon" />
  //           <h3>Phone Number</h3>
  //           <p>+1 234 567 890</p>
  //         </div>
          
  //         <div className="info-card">
  //           <FontAwesomeIcon icon={faEnvelope} className="icon" />
  //           <h3>Email Address</h3>
  //           <p>info@alghani.com</p>
  //         </div>

  //         <div className="social-links">
  //           <a href="#" className="social-icon"><FontAwesomeIcon icon={faFacebook} /></a>
  //           <a href="#" className="social-icon"><FontAwesomeIcon icon={faTwitter} /></a>
  //           <a href="#" className="social-icon"><FontAwesomeIcon icon={faInstagram} /></a>
  //           <a href="#" className="social-icon"><FontAwesomeIcon icon={faLinkedin} /></a>
  //         </div>
  //       </div>

  //       <div className="contact-form">
  //         <form onSubmit={handleSubmit}>
  //           <div className="form-group">
  //             <input
  //               type="text"
  //               name="name"
  //               value={formData.name}
  //               onChange={handleChange}
  //               placeholder="Your Name"
  //               required
  //             />
  //           </div>
            
  //           <div className="form-group">
  //             <input
  //               type="email"
  //               name="email"
  //               value={formData.email}
  //               onChange={handleChange}
  //               placeholder="Your Email"
  //               required
  //             />
  //           </div>
            
  //           <div className="form-group">
  //             <input
  //               type="text"
  //               name="subject"
  //               value={formData.subject}
  //               onChange={handleChange}
  //               placeholder="Subject"
  //               required
  //             />
  //           </div>
            
  //           <div className="form-group">
  //             <textarea
  //               name="message"
  //               value={formData.message}
  //               onChange={handleChange}
  //               placeholder="Your Message"
  //               required
  //             ></textarea>
  //           </div>
            
  //           <button type="submit" className="submit-btn">Send Message</button>
  //         </form>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default Contact;

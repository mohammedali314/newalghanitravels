import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt, faPaperPlane, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import './contact.scss';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(formData);
    setIsSubmitting(false);
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <span className="subtitle">Contact Us</span>
        <h1>Get in Touch</h1>
        <p>We'd love to hear from you. Our friendly team is always here to chat.</p>
      </div>

      <div className="contact-container">
        <div className="contact-info-section">
          <div className="info-header">
            <h2>Let's talk about everything.</h2>
            <p>Choose your preferred way to connect with us.</p>
          </div>

          <div className="info-items">
            <div className="info-item">
              <div className="icon-wrapper">
                <FontAwesomeIcon icon={faPhone} className="icon" />
              </div>
              <div className="info-content">
                <h3>Call Us</h3>
                <p>+92 301 6262050</p>
                <span className="availability">Mon-Sun from 9am to 6pm</span>
              </div>
            </div>

            <div className="info-item">
              <div className="icon-wrapper">
                <FontAwesomeIcon icon={faEnvelope} className="icon" />
              </div>
              <div className="info-content">
                <h3>Email Us</h3>
                <p>info@newalghani.com</p>
                <span className="availability">We'll respond within 24 hours</span>
              </div>
            </div>

            <div className="info-item">
              <div className="icon-wrapper">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
              </div>
              <div className="info-content">
                <h3>Visit Us</h3>
                <p>Shop No.6944,18:70 3 Star Market,Karianwala,Gujrat</p>
                <span className="availability">Open Monday - Sunday</span>
              </div>
            </div>
          </div>

          <div className="social-links">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="https://facebook.com" className="social-icon" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebook} /></a>
              <a href="https://twitter.com" className="social-icon" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} /></a>
              <a href="https://instagram.com" className="social-icon" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} /></a>
              <a href="https://linkedin.com" className="social-icon" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} /></a>
            </div>
          </div>
        </div>

        <div className="contact-form-section">
          <div className="form-header">
            <h2>Send us a message</h2>
            <p>Fill out the form below and we'll get back to you shortly.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className={focusedInput === 'name' ? 'focused' : ''}>
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedInput('name')}
                  onBlur={() => setFocusedInput(null)}
                  placeholder="M Ali"
                  required
                />
              </div>
              <div className="form-group">
                <label className={focusedInput === 'email' ? 'focused' : ''}>
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                  placeholder="Ali@example.com"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className={focusedInput === 'subject' ? 'focused' : ''}>
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                onFocus={() => setFocusedInput('subject')}
                onBlur={() => setFocusedInput(null)}
                placeholder="How can we help?"
                required
              />
            </div>

            <div className="form-group">
              <label className={focusedInput === 'message' ? 'focused' : ''}>
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocusedInput('message')}
                onBlur={() => setFocusedInput(null)}
                placeholder="Tell us about your inquiry..."
                required
              ></textarea>
            </div>

            <button type="submit" className={`submit-btn ${isSubmitting ? 'submitting' : ''}`} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <FontAwesomeIcon icon={faCircleNotch} className="spin" />
                  Sending...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faPaperPlane} className="btn-icon" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;

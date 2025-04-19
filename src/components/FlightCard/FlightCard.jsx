// src/Components/FlightCard.tsx

import React from 'react';
import PropTypes from 'prop-types';
import './FlightCard.scss';

const FlightCard = ({ flight }) => {
  return (
    <div className="flightCard" style={{
      backgroundColor: 'white',
      padding: '1.5rem',
      borderRadius: '8px',
      marginBottom: '1rem',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      color: '#333',
      width: '100%',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div>
          <p><strong>From:</strong> {flight.from}</p>
          <p><strong>To:</strong> {flight.to}</p>
        </div>
        <div>
          <p><strong>Date:</strong> {flight.date}</p>
          <p><strong>Class:</strong> {flight.class}</p>
        </div>
      </div>
      <div style={{ 
        textAlign: 'center', 
        padding: '1rem',
        backgroundColor: '#f5f5f5',
        borderRadius: '4px'
      }}>
        <p style={{ fontSize: '1.2rem', margin: 0 }}><strong>Price:</strong> {flight.price}</p>
      </div>
    </div>
  );
};

FlightCard.propTypes = {
  flight: PropTypes.shape({
    id: PropTypes.number.isRequired,
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    class: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired
  }).isRequired
};

export default FlightCard;

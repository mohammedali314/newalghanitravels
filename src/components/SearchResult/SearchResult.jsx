import React from 'react';
import './SearchResults.scss';

const SearchResults = ({ results }) => {
  return (
    <div className="flightResults">
      <h2>Available Flights</h2>
      {results.length > 0 ? (
        results.map((flight) => (
          <div className="resultRow" key={flight.id}>
            <div className="flightDetail">
              <div className="route">
                <span><strong>From:</strong> {flight.from}</span>
                <span><strong>To:</strong> {flight.to}</span>
              </div>
              <div className="info">
                <span><strong>Date:</strong> {flight.date}</span>
                <span><strong>Class:</strong> {flight.class}</span>
              </div>
              <div className="price">
                <span><strong>Price:</strong> PKR {flight.price}</span>
              </div>
            </div>
            <button className="btn bookBtn">Book Now</button>
          </div>
        ))
      ) : (
        <p className="noResults">No flights found matching your criteria</p>
      )}
    </div>
  );
};

export default SearchResults;

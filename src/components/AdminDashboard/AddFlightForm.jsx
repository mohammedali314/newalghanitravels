import React, { useState } from 'react';
import './AddFlightForm.scss';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import axios from 'axios';

const AddFlightForm = () => {
  const [segments, setSegments] = useState([{
    origin: '',
    destination: '',
    departureTime: '',
    arrivalTime: '',
    flightNumber: '',
    baggageAllowance: ''
  }]);
  const [airlineLogo, setAirlineLogo] = useState(null);
  const [mealIncluded, setMealIncluded] = useState(false);
  const [roundTrip, setRoundTrip] = useState(false);
  const [availableSeats, setAvailableSeats] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSegmentChange = (index, field, value) => {
    const newSegments = [...segments];
    newSegments[index] = { ...newSegments[index], [field]: value };
    setSegments(newSegments);
  };

  const addSegment = () => {
    setSegments([...segments, {
      origin: '',
      destination: '',
      departureTime: '',
      arrivalTime: '',
      flightNumber: '',
      baggageAllowance: ''
    }]);
  };

  const removeSegment = (index) => {
    if (segments.length > 1) {
      setSegments(segments.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('segments', JSON.stringify(segments));
    formData.append('mealIncluded', mealIncluded);
    formData.append('roundTrip', roundTrip);
    formData.append('availableSeats', availableSeats);
    formData.append('price', price);
    if (airlineLogo) {
      formData.append('airlineLogo', airlineLogo);
    }

    try {
      await axios.post('http://localhost:5000/api/flights', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setSuccess('Flight added successfully!');
      // Reset form
      setSegments([{
        origin: '',
        destination: '',
        departureTime: '',
        arrivalTime: '',
        flightNumber: '',
        baggageAllowance: ''
      }]);
      setAirlineLogo(null);
      setMealIncluded(false);
      setRoundTrip(false);
      setAvailableSeats('');
      setPrice('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding flight');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-flight-form">
      <form onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <div className="segments-container">
          <div className="segments-header">
            <h3>Flight Segments</h3>
            <button type="button" onClick={addSegment} className="add-segment-btn">
              <FiPlus /> Add Segment
            </button>
          </div>

          {segments.map((segment, index) => (
            <div key={index} className="segment-card">
              <div className="segment-header">
                <h4>Segment #{index + 1}</h4>
                {segments.length > 1 && (
                  <button 
                    type="button" 
                    onClick={() => removeSegment(index)}
                    className="remove-segment-btn"
                  >
                    <FiTrash2 />
                  </button>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Origin</label>
                  <input
                    type="text"
                    value={segment.origin}
                    onChange={(e) => handleSegmentChange(index, 'origin', e.target.value)}
                    required
                    placeholder="e.g., LHR"
                  />
                </div>

                <div className="form-group">
                  <label>Destination</label>
                  <input
                    type="text"
                    value={segment.destination}
                    onChange={(e) => handleSegmentChange(index, 'destination', e.target.value)}
                    required
                    placeholder="e.g., JFK"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Departure Time</label>
                  <input
                    type="datetime-local"
                    value={segment.departureTime}
                    onChange={(e) => handleSegmentChange(index, 'departureTime', e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Arrival Time</label>
                  <input
                    type="datetime-local"
                    value={segment.arrivalTime}
                    onChange={(e) => handleSegmentChange(index, 'arrivalTime', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Flight Number</label>
                  <input
                    type="text"
                    value={segment.flightNumber}
                    onChange={(e) => handleSegmentChange(index, 'flightNumber', e.target.value)}
                    required
                    placeholder="e.g., BA123"
                  />
                </div>

                <div className="form-group">
                  <label>Baggage Allowance</label>
                  <input
                    type="text"
                    value={segment.baggageAllowance}
                    onChange={(e) => handleSegmentChange(index, 'baggageAllowance', e.target.value)}
                    required
                    placeholder="e.g., 20kg"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="form-section">
          <h3>Flight Details</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label>Airline Logo</label>
              <input
                type="file"
                onChange={(e) => setAirlineLogo(e.target.files[0])}
                accept="image/*"
                required
              />
            </div>

            <div className="form-group">
              <label>Available Seats</label>
              <input
                type="number"
                value={availableSeats}
                onChange={(e) => setAvailableSeats(e.target.value)}
                required
                min="0"
                placeholder="Enter number of seats"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price (PKR)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                min="0"
                placeholder="Enter price in PKR"
              />
            </div>

            <div className="form-group checkboxes">
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="mealIncluded"
                  checked={mealIncluded}
                  onChange={(e) => setMealIncluded(e.target.checked)}
                />
                <label htmlFor="mealIncluded">Meal Included</label>
              </div>

              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="roundTrip"
                  checked={roundTrip}
                  onChange={(e) => setRoundTrip(e.target.checked)}
                />
                <label htmlFor="roundTrip">Round Trip</label>
              </div>
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          className="submit-button" 
          disabled={loading}
        >
          {loading ? 'Adding Flight...' : 'Add Flight'}
        </button>
      </form>
    </div>
  );
};

export default AddFlightForm; 
import React, { useState, useEffect } from 'react'
import './home.scss'
import video from '../../Assets/video.mp4'
import {MdFlight, MdPerson} from "react-icons/md"
import {FiSearch} from "react-icons/fi"
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io"
import {BsCalendar3} from "react-icons/bs"
import {RiVipCrownLine} from "react-icons/ri"
import logo from '../../Assets/LOGOO.png'

const Home = ({ onSearch }) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departDate, setDepartDate] = useState('26/04/2025');
  const [returnDate, setReturnDate] = useState('DD/MM/YYYY');
  const [tripType, setTripType] = useState('oneWay');
  const [passengers, setPassengers] = useState('1 Passenger');
  const [travelClass, setTravelClass] = useState('Economy');
  const [isLoading, setIsLoading] = useState(true);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [multiCityFlights, setMultiCityFlights] = useState([
    { id: 1, from: '', to: '', date: '' }
  ]);

  const dummyFlights = [
    {
      id: 1,
      from: "Lahore",
      to: "Karachi",
      date: "2025-05-01",
      class: "Economy",
      price: "25,000",
    },
    {
      id: 2,
      from: "Lahore",
      to: "Karachi",
      date: "2025-05-01",
      class: "Economy",
      price: "75,000",
    },
    {
      id: 3,
      from: "Islamabad",
      to: "Dubai",
      date: "2025-05-03",
      class: "Business",
      price: "120,000",
    },
  ];

  const handleMultiCityChange = (index, field, value) => {
    const updatedFlights = multiCityFlights.map((flight, i) => {
      if (i === index) {
        return { ...flight, [field]: value };
      }
      return flight;
    });
    setMultiCityFlights(updatedFlights);
  };

  const addFlightSegment = () => {
    setMultiCityFlights([
      ...multiCityFlights,
      { id: multiCityFlights.length + 1, from: '', to: '', date: '' }
    ]);
  };

  const removeFlightSegment = (index) => {
    if (multiCityFlights.length > 1) {
      setMultiCityFlights(multiCityFlights.filter((_, i) => i !== index));
    }
  };

  const handleSearch = () => {
    const searchParams = {
      tripType,
      passengers,
      travelClass,
      flights: tripType === 'multiCity' 
        ? multiCityFlights 
        : [{
            from: origin,
            to: destination,
            date: departDate,
            returnDate: tripType === 'roundTrip' ? returnDate : null
          }]
    };
    
    console.log('Search parameters:', searchParams);
    
    const results = tripType === 'multiCity'
      ? dummyFlights.filter(flight =>
          multiCityFlights.some(segment =>
            flight.from.toLowerCase().includes(segment.from.toLowerCase()) &&
            flight.to.toLowerCase().includes(segment.to.toLowerCase()) &&
            flight.date === segment.date
          )
        )
      : dummyFlights.filter(flight =>
          flight.from.toLowerCase().includes(origin.toLowerCase()) &&
          flight.to.toLowerCase().includes(destination.toLowerCase()) &&
          (flight.date === departDate || (tripType === 'roundTrip' && flight.date === returnDate)) &&
          flight.class === travelClass
        );
    
    console.log('Search results:', results);
    onSearch(results);
  };

  useEffect(() => {
    // Show loading screen for 2-3 seconds
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // 2.5 seconds

    return () => clearTimeout(loadingTimer);
  }, []);

  const renderMultiCityForm = () => {
    return (
      <div className="searchForm multiCity">
        {multiCityFlights.map((flight, index) => (
          <div key={flight.id} className="flightSegment">
            <div className="segmentHeader">
              <span className="segmentTitle">Flight {index + 1}</span>
              {index > 0 && (
                <button 
                  className="removeFlightBtn"
                  onClick={() => removeFlightSegment(index)}
                >
                  Remove Flight
                </button>
              )}
            </div>
            <div className="formRow">
              <div className="inputGroup">
                <label>Flying From</label>
                <div className="input">
                  <MdFlight className='icon' />
                  <input 
                    type="text" 
                    placeholder='Enter city or airport' 
                    value={flight.from}
                    onChange={(e) => handleMultiCityChange(index, 'from', e.target.value)}
                  />
                </div>
              </div>

              <div className="inputGroup">
                <label>Flying To</label>
                <div className="input">
                  <MdFlight className='icon' style={{ transform: 'translateY(-50%) rotate(90deg)' }} />
                  <input 
                    type="text" 
                    placeholder='Enter city or airport' 
                    value={flight.to}
                    onChange={(e) => handleMultiCityChange(index, 'to', e.target.value)}
                  />
                </div>
              </div>

              <div className="inputGroup">
                <label>Depart</label>
                <div className="input dateInput">
                  <BsCalendar3 className='icon' />
                  <input 
                    type="text" 
                    value={flight.date}
                    placeholder="Select date"
                    onChange={(e) => handleMultiCityChange(index, 'date', e.target.value)}
                  />
                  <div className="dateControls">
                    <button className="dateNav">
                      <IoIosArrowBack />
                    </button>
                    <button className="dateNav">
                      <IoIosArrowForward />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="addFlightSection">
          <button className="addFlightBtn" onClick={addFlightSegment}>
            <MdFlight className="addFlightIcon" />
            Add another flight
          </button>
        </div>

        <div className="passengerDetails">
          <div className="formRow">
            <div className="inputGroup">
              <label>Passengers</label>
              <div className="input">
                <MdPerson className='icon' />
                <select 
                  value={passengers} 
                  onChange={(e) => setPassengers(e.target.value)}
                >
                  <option>1 Passenger</option>
                  <option>2 Passengers</option>
                  <option>3 Passengers</option>
                  <option>4+ Passengers</option>
                </select>
              </div>
            </div>

            <div className="inputGroup">
              <label>Class</label>
              <div className="input">
                <RiVipCrownLine className='icon' />
                <select 
                  value={travelClass} 
                  onChange={(e) => setTravelClass(e.target.value)}
                >
                  <option>Economy</option>
                  <option>Business</option>
                  <option>First Class</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="formActions">
          <button className="advancedSearchBtn">
            Advanced Search
          </button>
          <button className="searchBtn" onClick={handleSearch}>
            <FiSearch className="searchIcon" />
            Search
          </button>
        </div>
      </div>
    );
  };

  const renderSearchForm = () => {
    if (tripType === 'multiCity') {
      return renderMultiCityForm();
    }

    return (
      <div className="searchForm">
        <div className="formRow">
          <div className="inputGroup">
            <label>Flying From</label>
            <div className="input">
              <MdFlight className='icon' />
              <input 
                type="text" 
                placeholder='Enter city or airport' 
                value={origin} 
                onChange={(e) => setOrigin(e.target.value)}
              />
            </div>
          </div>

          <div className="inputGroup">
            <label>Flying To</label>
            <div className="input">
              <MdFlight className='icon' style={{ transform: 'translateY(-50%) rotate(90deg)' }} />
              <input 
                type="text" 
                placeholder='Enter city or airport' 
                value={destination} 
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
          </div>

          <div className="inputGroup">
            <label>Depart</label>
            <div className="input dateInput">
              <BsCalendar3 className='icon' />
              <input 
                type="text" 
                value={departDate}
                placeholder="Select date"
                onChange={(e) => setDepartDate(e.target.value)}
              />
              <div className="dateControls">
                <button className="dateNav">
                  <IoIosArrowBack />
                </button>
                <button className="dateNav">
                  <IoIosArrowForward />
                </button>
              </div>
            </div>
          </div>

          {tripType === 'roundTrip' && (
            <div className="inputGroup">
              <label>Return</label>
              <div className="input dateInput">
                <BsCalendar3 className='icon' />
                <input 
                  type="text" 
                  value={returnDate}
                  placeholder="Select date"
                  onChange={(e) => setReturnDate(e.target.value)}
                />
                <div className="dateControls">
                  <button className="dateNav">
                    <IoIosArrowBack />
                  </button>
                  <button className="dateNav">
                    <IoIosArrowForward />
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className={`inputGroup ${tripType === 'roundTrip' ? 'shorter' : ''}`}>
            <label>Passengers</label>
            <div className="input">
              <MdPerson className='icon' />
              <select 
                value={passengers} 
                onChange={(e) => setPassengers(e.target.value)}
              >
                <option>1 Passenger</option>
                <option>2 Passengers</option>
                <option>3 Passengers</option>
                <option>4+ Passengers</option>
              </select>
            </div>
          </div>

          <div className={`inputGroup ${tripType === 'roundTrip' ? 'shorter' : ''}`}>
            <label>Class</label>
            <div className="input">
              <RiVipCrownLine className='icon' />
              <select 
                value={travelClass} 
                onChange={(e) => setTravelClass(e.target.value)}
              >
                <option>Economy</option>
                <option>Business</option>
                <option>First Class</option>
              </select>
            </div>
          </div>
        </div>

        <div className="formActions">
          <button className="advancedSearchBtn">
            Advanced Search
          </button>
          <button className="searchBtn" onClick={handleSearch}>
            <FiSearch className="searchIcon" />
            Search
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      {isLoading && (
        <div className="loading-screen">
          <div className="loading-content">
            <img src={logo} alt="New Alghani Travels Logo" className="loading-logo" />
            <div className="loading-spinner"></div>
          </div>
        </div>
      )}
      <section className="home">
        <div className="overlay"></div>
        <video src={video} muted autoPlay loop type='video/mp4' className='video'></video>

        <div className="homeContent container">
          <div className="textDiv">
            <h1 className="mainTitle">YOUR JOURNEY BEGINS</h1>
            <h2 className="subTitle">Where would you like to go?</h2>
          </div>

          <div className="cardDiv">
            <div className="tripTypeNav">
              <div className="tripTypeGroup">
                <button 
                  className={`navBtn ${tripType === 'oneWay' ? 'active' : ''}`}
                  onClick={() => setTripType('oneWay')}
                >
                  One Way
                </button>
                <button 
                  className={`navBtn ${tripType === 'roundTrip' ? 'active' : ''}`}
                  onClick={() => setTripType('roundTrip')}
                >
                  Round Trip
                </button>
              </div>
              <button 
                className={`navBtn ${tripType === 'multiCity' ? 'active' : ''}`}
                onClick={() => setTripType('multiCity')}
              >
                Multi-city
              </button>
              <button 
                className={`navBtn ${tripType === 'group' ? 'active' : ''}`}
                onClick={() => {window.location.href = '/coming-soon'}}
              >
                Group Booking
              </button>
              <button 
                className={`navBtn ${tripType === 'special' ? 'active' : ''}`}
                onClick={() => {window.location.href = '/coming-soon'}}
              >
                Special Offers
              </button>
            </div>

            {renderSearchForm()}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

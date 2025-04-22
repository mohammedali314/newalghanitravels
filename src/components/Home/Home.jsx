import React, { useState, useEffect } from 'react'
import './home.scss'
import video from '../../Assets/video.mp4'
import {GrLocation} from "react-icons/gr"
import logo from '../../Assets/LOGOO.png'

const Home = ({ onSearch }) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);

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

  const handleSearch = () => {
    console.log('Search parameters:', { origin, destination, date });
    
    const results = dummyFlights.filter(flight =>
      flight.from.toLowerCase().includes(origin.toLowerCase()) &&
      flight.to.toLowerCase().includes(destination.toLowerCase()) &&
      flight.date === date
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

  return (
    <>
      {isLoading && (
        <div className="loading-screen">
          <div className="loading-content">
            <img src={logo} alt="Alghani Travels Logo" className="loading-logo" />
            <div className="loading-spinner"></div>
          </div>
        </div>
      )}
      <section className="home">
        <div className="overlay"></div>
        <video src={video} muted autoPlay loop type='video/mp4' className='video'></video>

        <div className="homeContent container">
          <div className="textDiv">
            <span className="smallText">
              Our Packages
            </span>
            <h1 className="homeTitle">
              Search Your Flights
            </h1>
          </div>

          <div className="cardDiv">
            <div className="filterOptions">
              <button className='btn'>One Way</button>
              <button className='btn'>Round Trip</button>
              <button className='btn'>Group Booking</button>
              <button className='btn'>Umrah/Hajj</button>
              {/* <button className='btn'>Multi City</button> */}
              <select>
                <option>Select Class</option>
                <option>Economy</option>
                <option>Business</option>
              </select>
            </div>

            <div className="searchInputs">
              <div className="originInput">
                <label htmlFor="city">Travel From:</label>
                <div className="input">
                  <input 
                    type="text" 
                    placeholder='Enter Origin' 
                    value={origin} 
                    onChange={(e) => setOrigin(e.target.value)}
                  />
                  <GrLocation className='icon'/>
                </div>
              </div>

              <div className="destinationInput">
                <label htmlFor="city">Travel To:</label>
                <div className="input">
                  <input 
                    type="text" 
                    placeholder='Enter Destination' 
                    value={destination} 
                    onChange={(e) => setDestination(e.target.value)}
                  />
                  <GrLocation className='icon'/>
                </div>
              </div>

              <div className="DateInput">
                <label htmlFor="date">Select Date</label>
                <div className="input">
                  <input 
                    type="date" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>

              <div className='SearchBtn'>
                <button className='btn' onClick={handleSearch}>Search</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

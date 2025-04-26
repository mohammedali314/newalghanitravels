import React, { useState, useEffect } from 'react';
import './AdminDashboard.scss';
import { FiUsers, FiCalendar, FiPlusCircle, FiLogOut, FiMenu, FiSearch, FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import { TbPlaneInflight } from 'react-icons/tb';
import { MdOutlineAirlineSeatReclineExtra } from 'react-icons/md';
import AddFlightForm from './AddFlightForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('flights');
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [stats, setStats] = useState({
    totalFlights: 0,
    totalAgents: 0,
    totalBookings: 0,
    activeFlights: 0
  });
  const [flights, setFlights] = useState([]);
  const [agents, setAgents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [activeSection]);

  const fetchData = async () => {
    try {
      setLoading(true);
      if (activeSection === 'flights') {
        const response = await axios.get('http://localhost:5000/api/flights');
        setFlights(response.data);
      } else if (activeSection === 'agents') {
        const response = await axios.get('http://localhost:5000/api/auth/agents');
        setAgents(response.data);
      } else if (activeSection === 'bookings') {
        const response = await axios.get('http://localhost:5000/api/bookings');
        setBookings(response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAgentStatus = async (agentId, status) => {
    try {
      await axios.put(`http://localhost:5000/api/auth/agents/${agentId}/status`, { status });
      fetchData();
    } catch (error) {
      console.error('Error updating agent status:', error);
    }
  };

  const handleDeleteFlight = async (flightId) => {
    if (window.confirm('Are you sure you want to delete this flight?')) {
      try {
        await axios.delete(`http://localhost:5000/api/flights/${flightId}`);
        fetchData();
      } catch (error) {
        console.error('Error deleting flight:', error);
      }
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const menuItems = [
    { id: 'flights', label: 'Manage Flights', icon: <TbPlaneInflight /> },
    { id: 'agents', label: 'Agents', icon: <FiUsers /> },
    { id: 'bookings', label: 'View Bookings', icon: <FiCalendar /> },
    { id: 'addFlight', label: 'Add Flight', icon: <FiPlusCircle /> }
  ];

  const StatCard = ({ title, value, icon }) => (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-info">
        <h3>{value}</h3>
        <p>{title}</p>
      </div>
    </div>
  );

  return (
    <div className="admin-dashboard">
      <aside className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <h1>New Alghani</h1>
          <button 
            className="toggle-sidebar" 
            onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
          >
            <FiMenu />
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => setActiveSection(item.id)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <button className="logout-button" onClick={handleLogout}>
          <FiLogOut />
          <span>Sign out</span>
        </button>
      </aside>

      <main className="main-content">
        <header className="content-header">
          <h2>Manage Flights</h2>
          <div className="user-info">
            <span>Admin</span>
            <div className="avatar">A</div>
          </div>
        </header>

        {activeSection === 'flights' && (
          <div className="flights-section">
            <div className="flights-header-bar">
              <h3 className="flights-title">Recent Flights</h3>
              <div className="flights-actions">
                <div className="search-bar">
                  <FiSearch />
                  <input
                    type="text"
                    placeholder="Search by flight, segment, or date..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
                <button className="add-flight-btn" onClick={() => setActiveSection('addFlight')}>
                  <FiPlus /> Add New Flight
                </button>
              </div>
            </div>
            <div className="flights-table-card">
              <table className="flights-table">
                <thead>
                  <tr>
                    <th>Logo</th>
                    {/* <th>Airline</th> */}
                    <th>Flight</th>
                    <th>Route</th>
                    <th>Departure</th>
                    <th>Arrival</th>
                    <th>Total Seats</th>
                    {/* <th>Seats Left</th> */}
                    <th>Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {flights.filter(flight => {
                    const q = search.toLowerCase();
                    return (
                      flight.segments[0]?.flightNumber?.toLowerCase().includes(q) ||
                      flight.segments.some(seg =>
                        seg.origin?.toLowerCase().includes(q) ||
                        seg.destination?.toLowerCase().includes(q)
                      ) ||
                      flight.segments[0]?.departureTime?.toLowerCase().includes(q)
                    );
                  }).map((flight) => {
                    const firstSeg = flight.segments[0];
                    const lastSeg = flight.segments[flight.segments.length-1];
                    return (
                      <tr key={flight._id} className="flight-row">
                        <td className="flight-logo-td">
                          <img src={`http://localhost:5000${flight.airlineLogo}`} alt="Airline Logo" className="flight-logo-large" />
                        </td>
                        {/* <td className="airline-name">{flight.airlineName || '—'}</td> */}
                        <td className="flight-number-td">{firstSeg?.flightNumber}</td>
                        <td className="route-td">
                          {flight.segments.map((seg, idx) => (
                            <span key={idx} className="segment-route">
                              {seg.origin?.toUpperCase()} <span className="arrow">→</span> {seg.destination?.toUpperCase()}
                              {idx < flight.segments.length-1 && <span className="segment-sep">, </span>}
                            </span>
                          ))}
                        </td>
                        <td className="departure-td">
                          {firstSeg?.departureTime?.replace('T', ' ').slice(0, 16)}
                        </td>
                        <td className="arrival-td">
                          {lastSeg?.arrivalTime ? lastSeg.arrivalTime.replace('T', ' ').slice(0, 16) : '—'}
                        </td>
                        {/* <td>{flight.totalSeats}</td> */}
                        <td>{flight.availableSeats}</td>
                        <td className="price-td">{flight.price}</td>
                        <td className="status-td">{flight.status || 'Scheduled'}</td>
                        <td>
                          <button className="delete-btn" title="Delete" onClick={() => handleDeleteFlight(flight._id)}>Delete</button>
                        </td>
                      </tr>
                    );
                  })}
                  {flights.length === 0 && (
                    <tr><td colSpan="11" className="no-flights">No flights found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeSection === 'addFlight' && (
          <AddFlightForm />
        )}

        {activeSection === 'agents' && (
          <div className="agents-section">
            <div className="agents-header-bar">
              <h3>Manage Agents</h3>
            </div>
            <div className="agents-cards-list">
              {loading ? (
                <div className="loading">Loading...</div>
              ) : agents.length === 0 ? (
                <div className="no-agents">No agents found.</div>
              ) : (
                agents.map((agent) => (
                  <div key={agent._id} className="agent-card-row">
                    <div className="agent-card-main">
                      <div className="agent-avatar-col">
                        <div className="agent-avatar">{agent.username?.charAt(0).toUpperCase()}</div>
                      </div>
                      <div className="agent-info-col">
                        <div className="agent-name">{agent.username}</div>
                        <div className="agent-company">{agent.companyName}</div>
                        <div className="agent-contact">
                          <span className="agent-email">{agent.email}</span>
                          <span className="agent-phone">{agent.contactNumber}</span>
                        </div>
                      </div>
                      <div className="agent-status-col">
                        <span className={`status-badge status-${agent.status}`}>{agent.status}</span>
                        <select
                          className="status-dropdown"
                          value={agent.status}
                          onChange={(e) => handleAgentStatus(agent._id, e.target.value)}
                        >
                          <option value="pending">Pending</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeSection === 'bookings' && (
          <div className="bookings-list">
            <h2>Manage Bookings</h2>
            {loading ? (
              <div className="loading">Loading...</div>
            ) : (
              <div className="bookingsList">
                {bookings.map((booking) => (
                  <div key={booking._id} className="bookingCard">
                    <div className="details">
                      <h3>Booking #{booking._id.slice(-6)}</h3>
                      <p>Agent: {booking.agent.companyName}</p>
                      <p>Flight: {booking.flight.segments[0].flightNumber}</p>
                      <p>Status: {booking.status}</p>
                    </div>
                    <div className="actions">
                      <button className="view">View Details</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard; 
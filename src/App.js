import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./app.css"
import Home from "./components/Home/Home.jsx";
import Navbar from "./components/NavBar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import About from "./components/About/About.jsx";
import SearchResults from "./components/SearchResult/SearchResult.jsx";
import Contact from "./components/ContactUs/Contact.jsx";
import ComingSoon from "./components/ComingSoon/ComingSoon.jsx";
import Testimonial from "./components/Testimonial/Testimonial.jsx";
import Team from "./components/Team/Team.jsx";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard.jsx";
import Profile from './components/Profile';

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  const handleSearch = (results) => {
    setSearchResults(results);
    setHasSearched(true);
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={user ? <Profile /> : <Home onSearch={handleSearch} />} />
            <Route path="/testimonials" element={<Testimonial />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/coming-soon" element={<ComingSoon />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;


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

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

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
            <Route path="/" element={
              <>
                <Home onSearch={handleSearch} />
                {hasSearched && searchResults.length > 0 && (
                  <div className="searchResultsContainer">
                    <SearchResults results={searchResults} />
                  </div>
                )}
                <About />
              </>
            } />
            <Route path="/packages" element={<ComingSoon />} />
            <Route path="/shop" element={<ComingSoon />} />
            <Route path="/about" element={<ComingSoon />} />
            <Route path="/pages" element={<ComingSoon />} />
            <Route path="/news" element={<ComingSoon />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;


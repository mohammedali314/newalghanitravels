import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./app.css"
import Home from "./components/Home/Home.jsx";
import Navbar from "./components/NavBar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import About from "./components/About/About.jsx";
import SearchResults from "./components/SearchResult/SearchResult.jsx";
import Contact from "./components/ContactUs/Contact.jsx";

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (results) => {
    setSearchResults(results);
    setHasSearched(true);
  };

  return (
    <Router>
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
            <Route path="/contact" element={<Contact />} />x
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;


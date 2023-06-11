import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Movies from './components/movies';
import Comics from './components/comics';
import SingleComic from './components/SingleComic';
import SingleCreator from './components/SingleCreator';
import SingleCharacter from './components/SingleCharacter';
import SingleEvent from './components/SingleEvent';
import SingleStory from './components/SingleNews';
import Fetch from './components/fetch';
import Characters from './components/characters';
import Creators from './components/creators';
import News from './components/news';
import Events from './components/events';
import Image1 from './images/img5-r.png';
import profile from './images/profile1-removebg-preview.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import SingleMovie from './components/SingleMovie';


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [navbarIsOpen, setNavbarIsOpen] = useState(true);

  const toggleNavbar = (isOpen) => {
    setNavbarIsOpen(isOpen);
  };

  const handleSearchClick = () => {
    setShowSearch(!showSearch);
  };

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="darkMode">
      <header>
          <h1>MARVEL</h1>
          <img src={Image1} className="img1" alt="Marvel" />
          <FontAwesomeIcon icon={faSearch} className="fontAwesomeIcon" onClick={handleSearchClick} />
          <div className="profile-dropdown">
            <img src={profile} className='profile' alt="Marvel" onClick={handleDropdownClick} />
            {showDropdown && (
              <div className="dropdown-menu">
                {/* Add the dropdown menu content here */}
                <ul>
                  <li>Edit Profile</li>
                  <li>Settings</li>
                  <li>Logout</li>
                </ul>
              </div>
            )}
          </div>
          <FontAwesomeIcon icon={faChevronDown} className="chevron-icon" onClick={handleDropdownClick} />
        </header>
        {showSearch && (
          <div className="search">
            <input type="search" placeholder="Search" className="input" />
          </div>
        )}
        <Navbar isOpen={navbarIsOpen} toggleNavbar={toggleNavbar} />
          <Routes>
            <Route path="/" element={<Fetch isOpen={navbarIsOpen} />} />
            <Route path="/fetch" element={<Fetch isOpen={navbarIsOpen} />} />
            <Route path="/comics" element={<Comics isOpen={navbarIsOpen} />} />
            <Route path="/comics/:id" element={<SingleComic />} />
            <Route path="/movies" element={<Movies isOpen={navbarIsOpen}/>} />
            <Route path='/movies/:id' element={<SingleMovie />}/>
            <Route path="/creators" element={<Creators isOpen={navbarIsOpen}/>} />
            <Route path="/creators/:id" element={<SingleCreator />} />
            <Route path="/characters" element={<Characters isOpen={navbarIsOpen} />} />
            <Route path="/characters/:id" element={<SingleCharacter />} />
            <Route path="/news" element={<News isOpen={navbarIsOpen} />} />
            <Route path="/news/:id" element={<SingleStory />} />
            <Route path="/events" element={<Events isOpen={navbarIsOpen}/>} />
            <Route path="/events/:id" element={<SingleEvent />} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;

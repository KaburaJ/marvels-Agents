import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Navbar() {
  const [showComponents, setShowComponents] = useState(true);

  const handleButtonClick = () => {
    setShowComponents(!showComponents);
  };

  return (
    <div className='navbar'>
      <FontAwesomeIcon icon={faBars} onClick={handleButtonClick} className="FontAwesomeIcon" />

      <ul className={`navbar-list ${showComponents ? 'show' : ''}`}>
        <li>
          <Link to="/fetch">All</Link>
        </li>
        <li>
          <Link to="/comics">Comics</Link>
        </li>
        <li>
          <Link to="/characters">Characters</Link>
        </li>
        <li>
          <Link to="/movies">Movies</Link>
        </li>
        <li>
          <Link to="/creators">Creators</Link>
        </li>
        {/* <li>
          <Link to="/games">Games</Link>
        </li> */}
        {/* <li>
          <Link to="/videos">Videos</Link>
        </li> */}
        {/* <li>
          <Link to="/more">More</Link>
        </li> */}
        <li>
          <Link to="/news">News</Link>
        </li>
        {/* <li>
          <Link to="/reviews">Reviews</Link>
        </li> */}
        <li>
          <Link to="/events">Events</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;

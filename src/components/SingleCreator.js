
import React, { useState, useEffect } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';

function SingleCreator() {
  const { id } = useParams();
  const [creator, setCreator] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  useEffect(() => {
    const fetchCreator = async () => {
      try {
        const response = await fetch(`https://gateway.marvel.com/v1/public/creators/${id}?ts=1&apikey=7c321818f6b1d697bb53281bfcedef68&hash=ad164c933ea6e6d88cda41dd9ba5d468`);
        if (!response.ok) {
          throw new Error('Failed to fetch creator');
        }
        const data = await response.json();
        setCreator(data.data.results[0]);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCreator();
  }, [id]);

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!creator) {
    return <div>Creator not found</div>;
  }

  const { fullName, thumbnail, comics, series, stories } = creator;

  return (
    <div className="creator-detail">
      <div className="creator-details">
        {fullName && <h2>{fullName}</h2>}
        {thumbnail && (
          <img src={`${thumbnail.path}.${thumbnail.extension}`} alt={fullName} />
        )}
      </div>
      <div className="details">
        {selectedMenuItem === 'comics' && (
          <div>
            {/* <h3>Comics</h3> */}
            {comics &&
              comics.items.map((comic, index) => (
                <p key={index}>{comic.name}</p>
              ))}
          </div>
        )}
        {selectedMenuItem === 'series' && (
          <div>
            {/* <h3>Series</h3> */}
            {series &&
              series.items.map((series, index) => (
                <p key={index}>{series.name}</p>
              ))}
          </div>
        )}
        {selectedMenuItem === 'stories' && (
          <div>
            {/* <h3>Stories</h3> */}
            {stories &&
              stories.items.map((story, index) => (
                <p key={index}>{story.name}</p>
              ))}
          </div>
        )}
      </div>
      <div className="menu">
        <button className="menu-button" onClick={handleMenuClick}>
          Menu
        </button>
        <div className={`menu-content ${showMenu ? 'show' : ''}`}>
          <ul>
            <li onClick={() => handleMenuItemClick('comics')}>Comics</li>
            <li onClick={() => handleMenuItemClick('series')}>Series</li>
            <li onClick={() => handleMenuItemClick('stories')}>Stories</li>
          </ul>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default SingleCreator;

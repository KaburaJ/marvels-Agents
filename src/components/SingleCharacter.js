import React, { useState, useEffect } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';

function SingleCharacter() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(
          `https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=7c321818f6b1d697bb53281bfcedef68&hash=ad164c933ea6e6d88cda41dd9ba5d468`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch character');
        }
        const data = await response.json();
        setCharacter(data.data.results[0]);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacter();
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

  if (!character) {
    return <div>Character not found</div>;
  }

  const { name, thumbnail, description, comics, series } = character;

  return (
    <div className="character-detail">
      <div className="character-details">
        {name && <h2>{name}</h2>}
        {thumbnail && (
          <img src={`${thumbnail.path}.${thumbnail.extension}`} alt={name} />
        )}
      </div>
      <div className="details">
        {selectedMenuItem === 'description' && (
          <div>
            <p>{description || 'No description available'}</p>
          </div>
        )}
        {selectedMenuItem === 'comics' && (
          <div>
            {/* <h3>Comics:</h3> */}
            {comics.items.map((comic) => (
              <p key={comic.resourceURI}>
                <Link to={`/comics/${comic.resourceURI.split('/').pop()}`}>
                  {comic.name}
                </Link>
              </p>
            ))}
          </div>
        )}
        {selectedMenuItem === 'series' && (
          <div>
            {/* <h3>Series:</h3> */}
            {series.items.map((series) => (
              <p key={series.resourceURI}>
                <Link to={`/series/${series.resourceURI.split('/').pop()}`}>
                  {series.name}
                </Link>
              </p>
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
            <li onClick={() => handleMenuItemClick('description')}>Description</li>
            <li onClick={() => handleMenuItemClick('comics')}>Comics</li>
            <li onClick={() => handleMenuItemClick('series')}>Series</li>
          </ul>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default SingleCharacter;

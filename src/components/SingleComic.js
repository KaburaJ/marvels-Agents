import React, { useState, useEffect } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';

function SingleComic() {
  const { id } = useParams();
  const [comic, setComic] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  useEffect(() => {
    const fetchComic = async () => {
      try {
        const response = await fetch(`https://gateway.marvel.com/v1/public/comics/${id}?ts=1&apikey=7c321818f6b1d697bb53281bfcedef68&hash=ad164c933ea6e6d88cda41dd9ba5d468`);
        if (!response.ok) {
          throw new Error('Failed to fetch comic');
        }
        const data = await response.json();
        const comicData = data.data.results.find((comic) => {
          const thumbnailUrl = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
          return thumbnailUrl !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
        });
        if (!comicData) {
          throw new Error('Comic not found');
        }
        setComic(comicData);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComic();
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

  if (!comic) {
    return <div>Comic not found</div>;
  }

  const { title, thumbnail, description, textObjects, issueNumber, variantDescription, format, pageCount } = comic;

  return (
    <div className="comic-detail">
      <div className="comic-details">
        {title && <h2>{title}</h2>}
        {thumbnail && (
          <img src={`${thumbnail.path}.${thumbnail.extension}`} alt={title} />
        )}
      </div>
      <div className="details">
        {selectedMenuItem === 'description' && (
          <div>
            {textObjects &&
              textObjects.map((textObj, index) => (
                <p key={index}>{textObj.text}</p>
              ))}
          </div>
        )}
        {selectedMenuItem === 'format' && (
          <div>
            <p>Format: {format}</p>
          </div>
        )}
        {selectedMenuItem === 'issueNumber' && (
          <div>
            <p>Issue Number: {issueNumber}</p>
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
            <li onClick={() => handleMenuItemClick('format')}>Format</li>
            <li onClick={() => handleMenuItemClick('issueNumber')}>Issue Number</li>
          </ul>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default SingleComic;

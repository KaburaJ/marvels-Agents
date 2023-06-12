import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Slideshow = ({ items }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    const startSlideshow = () => {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % items.length);
      }, 3000);
    };

    startSlideshow();

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [currentImageIndex, items]);

  const filteredItems = items.filter(
    (item) => item.thumbnail && item.thumbnail.path.indexOf('image_not_available') === -1
  );

  return (
    <ul className="slideshow">
      {filteredItems.map((item, index) => (
        <li key={item.id} style={{ display: index === currentImageIndex ? 'block' : 'none' }}>
          <Link to={`/details/${item.id}`}>
            <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} alt={item.title} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

const Fetch = ({isOpen}) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://gateway.marvel.com/v1/public/events?ts=1&apikey=7c321818f6b1d697bb53281bfcedef68&hash=ad164c933ea6e6d88cda41dd9ba5d468');
        if (!response.ok) {
          throw new Error('Failed to fetch comics');
        }
        const data = await response.json();
        setItems(data.data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      };
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div 
    className="fetch"
    style={{
      marginLeft: isOpen ? ".001em" : "5.4em",
      gridTemplateColumns: isOpen ? "repeat(4, 1fr)" : "repeat(3, 1fr)",
      transition: "0.3s ease-in",
      width: isOpen? "120%": "10%",
      display: "block", 
      transitionX: ".7s ease-in"
    }}
    // style={{marginLeft: isOpen? ".1em": "4.5em", width: isOpen? "120%": "10%", display: "block", transitionX: ".7s ease-in"}}
    >
      <Slideshow items={items} 
      
      />
    </div>
  );
};

export default Fetch;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Events({isOpen}) {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Perform the fetch request here to get the events data
        const response = await fetch('https://gateway.marvel.com/v1/public/events?ts=1&apikey=7c321818f6b1d697bb53281bfcedef68&hash=ad164c933ea6e6d88cda41dd9ba5d468');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data.data.results); // Update the events state with the fetched data
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = events.slice(indexOfFirstItem, indexOfLastItem);
  

  const totalPages = Math.ceil(events.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="events">
      {/* <h1>Events</h1> */}
      <ul
      style={{
        marginLeft: isOpen ? "3.4em" : "5.4em",
        gridTemplateColumns: isOpen ? "repeat(4, 1fr)" : "repeat(3, 1fr)",
        transition: "0.3s ease-in",
      }}
      >
        {currentItems.map((event) => (
          <li style={{marginRight: isOpen? "2.2em": "2.5em"}} key={event.id}>
            <Link 
            style={{ width: isOpen? "17em":"20em", height: isOpen? "19em":"19em"}}
            to={`/events/${event.id}`}>
              <img
              style={{ width: isOpen? "17em":"20em"}} 
              src={`${event.thumbnail.path}.${event.thumbnail.extension}`} alt={event.title} />
              {event.title}
            </Link>
          </li>
        ))}
      </ul>
      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              className={currentPage === pageNumber ? 'active' : ''}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Events;

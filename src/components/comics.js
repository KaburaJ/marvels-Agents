import React, { useState, useEffect } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import '../App.css';

function Comics({isOpen}) {
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const response = await fetch('https://gateway.marvel.com/v1/public/comics?ts=1&apikey=7c321818f6b1d697bb53281bfcedef68&hash=ad164c933ea6e6d88cda41dd9ba5d468');
        if (!response.ok) {
          throw new Error('Failed to fetch comics');
        }
        const data = await response.json();
        setComics(data.data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComics();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = comics.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(comics.length / itemsPerPage);

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
    <div className="comics">
      <ul 
      style={{
        marginLeft: isOpen ? "1.5em" : "4.5em",
        gridTemplateColumns: isOpen ? "repeat(4, 1fr)" : "repeat(3, 1fr)",
        transition: "0.3s ease-in"
      }}
      >
        {currentItems.map((comic) => (
          <li style={{marginRight: isOpen? "2.2em": "1em"}} key={comic.id}>
            <Link 
            style={{ width: isOpen? "14em":"18em", height: isOpen? "19em":"19em"}}
            to={`/comics/${comic.id}`}>
              <img 
              style={{ width: isOpen? "14em":"18em"}}
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} />
              <p>{comic.title}</p>
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
      <Outlet />
    </div>
  );
}

export default Comics;
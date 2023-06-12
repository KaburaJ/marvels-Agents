import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Movies({isOpen}) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Perform the fetch request here to get the movies data
        const response = await fetch('https://gateway.marvel.com/v1/public/series?ts=1&apikey=7c321818f6b1d697bb53281bfcedef68&hash=ad164c933ea6e6d88cda41dd9ba5d468');
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        const data = await response.json();
        setMovies(data.data.results); // Update the movies state with the fetched data
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = movies.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(movies.length / itemsPerPage);

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
    <div className="movies">
      {/* <h1>Movies</h1> */}
      <ul
      style={{
        marginLeft: isOpen ? "1.4em" : "5.4em",
        gridTemplateColumns: isOpen ? "repeat(4, 1fr)" : "repeat(3, 1fr)",
        transition: "0.3s ease-in",
      }}
      >
        {currentItems.map((movie) => (
          <li style={{marginRight: isOpen? "2.2em": "2.5em"}} key={movie.id}>
            <Link 
            style={{ width: isOpen? "17em":"20em", height: isOpen? "19em":"19em"}}
            to={`/movies/${movie.id}`}>
              <img 
              style={{ width: isOpen? "17em":"20em"}}
              src={`${movie.thumbnail.path}.${movie.thumbnail.extension}`} alt={movie.title} />
              {movie.title}
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

export default Movies;

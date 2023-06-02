import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Comics() {
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);

  useEffect(() => {
    const fetchComics = async () => {
      try {
        // Perform the fetch request here to get the comics data
        const response = await fetch('https://gateway.marvel.com/v1/public/comics?ts=1&apikey=7c321818f6b1d697bb53281bfcedef68&hash=ad164c933ea6e6d88cda41dd9ba5d468');
        if (!response.ok) {
          throw new Error('Failed to fetch comics');
        }
        const data = await response.json();
        setComics(data.data.results); // Update the comics state with the fetched data
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComics();
  }, []);

  // Pagination
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
      {/* <h1>Comics</h1> */}
      <ul>
        {currentItems.map((comic) => (
          <li key={comic.id} className='comicDetails'>
          <Link to={`/comics/${comic.id}?`}>
            <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} />
          </Link>
          <div>
            {comic.title}
            Page Count: {comic.pageCount}
          </div>
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

export default Comics;

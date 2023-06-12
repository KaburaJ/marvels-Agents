import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Creators({ isOpen }) {
  const [creators, setCreators] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const response = await fetch('https://gateway.marvel.com/v1/public/creators?ts=1&apikey=7c321818f6b1d697bb53281bfcedef68&hash=ad164c933ea6e6d88cda41dd9ba5d468');
        if (!response.ok) {
          throw new Error('Failed to fetch creators');
        }
        const data = await response.json();
        setCreators(data.data.results); 
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCreators();
  }, []);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = creators.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(creators.length / itemsPerPage);

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
    <div className="creators">
      {/* <h1>Creators</h1> */}
      <ul
      style={{
        marginLeft: isOpen ? "1.4em" : "5.4em",
        gridTemplateColumns: isOpen ? "repeat(4, 1fr)" : "repeat(3, 1fr)",
        transition: "0.3s ease-in",
      }}
      >
        {currentItems.map((creator) => (
          <li style={{marginRight: isOpen? "2.2em": "2.5em"}} key={creator.id}>
            <Link 
            style={{ width: isOpen? "17em":"20em", height: isOpen? "19em":"19em"}}
            to={`/creators/${creator.id}`}>
              <img
              style={{ width: isOpen? "17em":"20em"}} 
              src={`${creator.thumbnail.path}.${creator.thumbnail.extension}`} alt={creator.fullName} />
              {creator.fullName}
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

export default Creators;

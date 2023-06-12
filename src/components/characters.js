
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Characters({isOpen}) {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        // Perform the fetch request here to get the characters data
        const response = await fetch('https://gateway.marvel.com/v1/public/characters?ts=1&apikey=7c321818f6b1d697bb53281bfcedef68&hash=ad164c933ea6e6d88cda41dd9ba5d468');
        if (!response.ok) {
          throw new Error('Failed to fetch characters');
        }
        const data = await response.json();
        setCharacters(data.data.results); // Update the characters state with the fetched data
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = characters.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(characters.length / itemsPerPage);

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
    <div className="characters">
      {/* <h1>Characters</h1> */}
      <ul 
      style={{
        marginLeft: isOpen ? "1.5em" : "5.9em",
        gridTemplateColumns: isOpen ? "repeat(4, 1fr)" : "repeat(3, 1fr)",
        transition: "0.3s ease-in",
      }}>
        {currentItems.map((character) => (
          <li style={{marginRight: isOpen? "2.2em": "2.9em"}} key={character.id}>
            <Link 
            style={{ width: isOpen? "14em":"17em", height: isOpen? "19em":"19em"}}
            to={`/characters/${character.id}`}>
              <img 
              style={{ width: isOpen? "14em":"17em"}}
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} />
              {character.name}
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

export default Characters;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


function News({isOpen}) {
  console.log(`News nav -- ${isOpen}`);
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Perform the fetch request here to get the news data
        const response = await fetch('https://gateway.marvel.com/v1/public/stories?ts=1&apikey=7c321818f6b1d697bb53281bfcedef68&hash=ad164c933ea6e6d88cda41dd9ba5d468');
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        const data = await response.json();
        setNews(data.data.results); // Update the news state with the fetched data
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = news.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(news.length / itemsPerPage);

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
    <div className="news">
      {/* <h1>News</h1> */}
      <ul
      style={{
        marginLeft: isOpen ? "1.2em" : "5em",
        gridTemplateColumns: isOpen ? "repeat(4, 1fr)" : "repeat(3, 1fr)",
        transition: "0.3s ease-in",
      }}
      >
      {currentItems.map((newer) => (
          <li style={{marginRight: isOpen? "1.2em": "2.5em"}}key={newer.id}>
            <Link 
            style={{ width: isOpen? "20.6em":"24em"}}
            to={`/news/${newer.id}`}>
              <p style={{ width: isOpen? "20.6em":"24em", padding: isOpen? ".6em":".6em", fontSize:"small"}}>{newer.title}</p>
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

export default News;

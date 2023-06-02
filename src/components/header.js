import React, { useState } from 'react';

function Header({ handleSearch, handleFilter }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    handleSearch(event.target.value);
  };

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
    handleFilter(event.target.value);
  };

  return (
    <header>
      <h1>MARVEL</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for content..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select value={selectedFilter} onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="comics">Comics</option>
          <option value="movies">Movies</option>
          <option value="characters">Characters</option>
          {/* Add more options for different content types */}
        </select>
      </div>
    </header>
  );
}

export default Header;

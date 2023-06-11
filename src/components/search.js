// import Navbar from "../navbar";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';



function Search() {
    return (
        <div className="search">
            <input
                type="search"
                placeholder="Search for content..."
            >
            </input>
            <FontAwesomeIcon icon={faSearch} className="FontAwesomeIcon" />
        </div>
    )
}

export default Search;
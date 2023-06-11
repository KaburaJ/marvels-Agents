import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHome } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { 
  faBook,
  faGamepad,
  faFilm,
  faHistory,
  faPerson,
  faPersonMilitaryRifle
} from '@fortawesome/free-solid-svg-icons';
import './App.css';

function Navbar({ children, isOpen, toggleNavbar }) {
  const menuItem = [
    {
      path: "/fetch",
      name: "Home",
      icon: <FontAwesomeIcon icon={faHome}/>
    },
    {
      path: "/comics",
      name: "Comics",
      icon: <FontAwesomeIcon icon={faBook}/>,
    },
    {
      path: "/characters",
      name: "Characters",
      icon: <FontAwesomeIcon icon={faGamepad}/>
    },
    {
      path: "/movies",
      name: "Movies",
      icon: <FontAwesomeIcon icon={faFilm}/>
    },
    {
      path: "/creators",
      name: "Creators",
      icon: <FontAwesomeIcon icon={faPerson}/>,
    },
    {
      path: "/news",
      name: "News",
      icon: <FontAwesomeIcon icon={faHistory}/>,
    },
    {
      path: "/events",
      name: "Events",
      icon: <FontAwesomeIcon icon={faPersonMilitaryRifle}/>,
    }
  ]

  const handleIconClick = () => {
    toggleNavbar(!isOpen);
  };

  return (
    <div className={`navbar ${isOpen ? 'open' : 'closed'}`}>
      <FontAwesomeIcon
        icon={faBars}
        onClick={handleIconClick}
        className="FontAwesomeIcon"
      />

      {menuItem.map((item, index) => (
        <NavLink
          style={{ width: isOpen ? "1.2em" : "4.4em" }}
          to={item.path}
          key={index}
          className="navbar-list"
          activeClassName="active"
        >
          <div className='icon'>
            <h2>{item.icon}</h2>
          </div>
          <div className="text">
            <h1 style={{ display: isOpen ? "none" : "block" }}>{item.name}</h1>
          </div>
        </NavLink>
      ))}

      <main>{children}</main>
    </div>
  );
}

export default Navbar;

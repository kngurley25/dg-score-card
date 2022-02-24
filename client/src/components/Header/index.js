import React from 'react';
import HeaderClasses from './Header.css';
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Auth from '../../utils/auth';
import {
  faHouse,
  faUser,
  faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';

function Header() {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <main className={HeaderClasses.Header}>
      <nav>
        <div className='navbar'>
          <div className='container nav-container'>
            <input className='checkbox' type='checkbox' />
            <div className='hamburger-lines'>
              <span className='line line1'></span>
              <span className='line line2'></span>
              <span className='line line3'></span>
            </div>
            <div className='logo'>
              <h1>
                DG-Sc
                <img
                  src={require('../../assets/images/favicon.png')}
                  className='disc-icon'
                  alt='disc icon'
                />
                recard
              </h1>
            </div>
            <div className='menu-items'>
              <li>
                <FontAwesomeIcon className='dropdown-icon' icon={faHouse} />
                <Link to="/">
                <button as={NavLink} to={'/'}>
                  Home
                </button>
                </Link>
              </li>
              <li>
                <FontAwesomeIcon className='dropdown-icon' icon={faUser} />
                <Link to="/profile">
                <button as={NavLink} to={'/'}>
                  Profile
                </button>
                </Link>
              </li>
              {Auth.loggedIn() ? (
              <li>
                <FontAwesomeIcon
                  className='dropdown-icon'
                  icon={faArrowRightFromBracket}
                />
                <button as={NavLink} to={'/'}>
                  <a href="/" onClick={logout}>
                  Logout
                  </a>
                </button>
              </li>
               ) : (
              <li>
                <FontAwesomeIcon className='dropdown-icon' icon={faUser} />
                <Link to="/login">
                <button as={NavLink} to={'/'}>
                  Login
                </button>
                </Link>
              </li>
               )}
            </div>
          </div>
        </div>
      </nav>
    </main>
  );
}

export default Header;

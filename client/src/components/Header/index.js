import React from 'react';
import HeaderClasses from './Header.css';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faUser,
  faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';

function Header() {
  return (
    <main className={HeaderClasses.Header}>
      <nav>
        <div class='navbar'>
          <div class='container nav-container'>
            <input class='checkbox' type='checkbox' />
            <div class='hamburger-lines'>
              <span class='line line1'></span>
              <span class='line line2'></span>
              <span class='line line3'></span>
            </div>
            <div class='logo'>
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
            <div class='menu-items'>
              <li>
                <FontAwesomeIcon className='dropdown-icon' icon={faHouse} />
                <Link to="/">
                <button>
                  Home
                  </button>
                  </Link>
              </li>
              <li>
                <FontAwesomeIcon className='dropdown-icon' icon={faUser} />
                <button>
                  Profile
                </button>
              </li>
              <li>
                <FontAwesomeIcon className='dropdown-icon' icon={faUser} />
                <button as={NavLink} to={'/'}>
                  Login
                </button>
              </li>
              <li>
                <FontAwesomeIcon
                  className='dropdown-icon'
                  icon={faArrowRightFromBracket}
                />
                <button>
                  <a className='logoutBtn' href="/" onClick={logout}>
                  Logout
                  </a>
                </button>
              </li>
               ) : (
              <li>
                <FontAwesomeIcon className='dropdown-icon' icon={faUser} />
                <Link to="/login">
                <button>
                  Login
                  </button>
                  </Link>
              </li>
            </div>
          </div>
        </div>
      </nav>
    </main>
  );
}

export default Header;

import React from 'react';
import NavClasses from './Nav.css';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faUser,
  faArrowRightFromBracket,
  faArrowRightToBracket,
} from '@fortawesome/free-solid-svg-icons';

function Nav() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <nav className={NavClasses.Nav}>
      <div className='mobile-nav d-flex align-items-end justify-content-around'>
        <div>
          <Link to={'/'} className='d-flex flex-column nav-item'>
            <FontAwesomeIcon icon={faHouse} className='fs-4 mb-2' />
            <h6>Home</h6>
          </Link>
        </div>
        <div>
          <Link to={'/profile'} className='d-flex flex-column nav-item'>
            <FontAwesomeIcon icon={faUser} className='fs-4 mb-2' />
            <h6>Profile</h6>
          </Link>
        </div>
        {Auth.loggedIn() ? (
          <div className=''>
            <a
              href='/'
              onClick={logout}
              className='d-flex flex-column nav-item'
            >
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                className='fs-3 mb-1'
              />
              <button className='logout-btn'>Logout</button>
            </a>
          </div>
        ) : (
          <div>
            <Link to={'/login'} className='d-flex flex-column nav-item'>
              <FontAwesomeIcon
                icon={faArrowRightToBracket}
                className='fs-4 mb-2'
              />
              <h6>Login</h6>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Nav;

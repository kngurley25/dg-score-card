import React from 'react';
import HeaderClasses from './Header.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Auth from '../../utils/auth';
import {
  faHouse,
  faUser,
  faArrowRightFromBracket,
  faArrowRightToBracket,
} from '@fortawesome/free-solid-svg-icons';

function Header() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className={HeaderClasses.Header}>
      <nav>
        <div className='navbar'>
          <div className='container nav-container'>
            <div className='large-nav'>
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
                      className='fs-2 mb-1'
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
            <div>
              <h1 className='logo'>
                DG-Sc
                <img
                  src={require('../../assets/images/disc-logo.png')}
                  className='disc-icon'
                  alt='disc icon'
                />
                recard
              </h1>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;

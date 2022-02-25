import React, { useRef, useState } from 'react';
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
  const [checked, setChecked] = useState(false);
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  // const checkbox = document.getElementById('checkbox');
  // const checkbox = useRef('checkbox');

  // console.log(checkbox);

  return (
    <main className={HeaderClasses.Header}>
      <nav>
        <div className='navbar'>
          <div className='container nav-container' id='menu'>
            <input
              checked={checked}
              className='checkbox'
              type='checkbox'
              onChange={() => setChecked(!checked)}
            />
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
                <Link to='/'>
                  <button onClick={() => setChecked(false)}>Home</button>
                </Link>
              </li>
              <li>
                <FontAwesomeIcon className='dropdown-icon' icon={faUser} />
                <Link to='/profile'>
                  <button onClick={() => setChecked(false)}>Profile</button>
                </Link>
              </li>
              {Auth.loggedIn() ? (
                <li>
                  <FontAwesomeIcon
                    className='dropdown-icon'
                    icon={faArrowRightFromBracket}
                  />
                  <button onClick={() => setChecked(false)}>
                    <a href='/' onClick={logout}>
                      Logout
                    </a>
                  </button>
                </li>
              ) : (
                <li>
                  <FontAwesomeIcon className='dropdown-icon' icon={faUser} />
                  <Link to='/login'>
                    <button onClick={() => setChecked(false)}>Login</button>
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

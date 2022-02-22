import React from 'react';
import HeaderClasses from './Header.css';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faHouse,
  faUser,
  faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';

function Header() {
  return (
    <main className={HeaderClasses.Header}>
      <div className='d-flex justify-content-between dropdown my-3 mx-4 fs-1'>
        <button
          className='btn btn-secondary dropdown-toggle'
          type='button'
          id='dropdownMenuButton1'
          data-bs-toggle='dropdown'
          aria-expanded='false'
        >
          <FontAwesomeIcon icon={faBars} className='menu-icon' />
        </button>
        <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
          <li>
            <button className='dropdown-item fs-1' as={NavLink} to={'/'}>
              <FontAwesomeIcon className='dropdown-icon' icon={faHouse} />
              <span className='ms-3'>Home</span>
            </button>
          </li>
          <li>
            <button className='dropdown-item fs-1' as={NavLink} to={'/'}>
              <FontAwesomeIcon className='dropdown-icon' icon={faUser} />
              <span className='ms-3'>Profile</span>
            </button>
          </li>
          <li>
            <button className='dropdown-item fs-1' as={NavLink} to={'/'}>
              <FontAwesomeIcon className='dropdown-icon' icon={faUser} />
              <span className='ms-3'>Login</span>
            </button>
          </li>
          <li>
            <button className='dropdown-item fs-1' as={NavLink} to={'/'}>
              <FontAwesomeIcon
                className='dropdown-icon'
                icon={faArrowRightFromBracket}
              />
              <span className='ms-3'>Logout</span>
            </button>
          </li>
        </ul>
        <div className='d-flex'>
          <h1>
            DG-Sc
            <img
              className='logo'
              src={require('../../assets/images/favicon.png')}
              alt='logo'
            />
            recard
          </h1>
        </div>
      </div>
    </main>
  );
}

export default Header;

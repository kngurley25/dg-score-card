import React, { useState, useRef, useEffect } from "react";

import HeaderClasses from "./Header.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Auth from "../../utils/auth";
import {
  faHouse,
  faUser,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

function Header() {
  const menu = useRef();

  const [checked, setChecked] = useState(false);
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (checked && menu.current && !menu.current.contains(e.target)) {
        setChecked(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [checked]);

  return (
    <section className={HeaderClasses.Header}>
      <nav>
        <div className="navbar">
          <div ref={menu} className="container nav-container" id="menu">
            <input
              checked={checked}
              className="checkbox"
              type="checkbox"
              onChange={() => setChecked(!checked)}
            />
            <div className="hamburger-lines">
              <span className="line line1"></span>
              <span className="line line2"></span>
              <span className="line line3"></span>
            </div>
            <div className="logo">
              <h1>
                DG-Sc
                <img
                  src={require("../../assets/images/favicon.png")}
                  className="disc-icon"
                  alt="disc icon"
                />
                recard
              </h1>
            </div>
            <div className="menu-items">
              <li>
                <FontAwesomeIcon className="dropdown-icon" icon={faHouse} />
                <Link to="/">
                  <button onClick={() => setChecked(false)}>Home</button>
                </Link>
              </li>
              <li>
                <FontAwesomeIcon className="dropdown-icon" icon={faUser} />
                <Link to="/profile">
                  <button onClick={() => setChecked(false)}>Profile</button>
                </Link>
              </li>
              {Auth.loggedIn() ? (
                <li>
                  <FontAwesomeIcon
                    className="dropdown-icon"
                    icon={faArrowRightFromBracket}
                  />
                  <button onClick={() => setChecked(false)}>
                    <a href="/" onClick={logout}>
                      Logout
                    </a>
                  </button>
                </li>
              ) : (
                <li>
                  <FontAwesomeIcon className="dropdown-icon" icon={faUser} />
                  <Link to="/login">
                    <button onClick={() => setChecked(false)}>Login</button>
                  </Link>
                </li>
              )}
            </div>
          </div>
        </div>
      </nav>
    </section>
  );
}

export default Header;

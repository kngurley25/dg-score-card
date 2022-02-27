import React from 'react';
import { Link } from "react-router-dom";
import Auth from '../utils/auth';

const Home = (props) => {
  return (
    <section className="p-4">
      <div className="d-flex justify-content-center">
        <h1 className="heading"> No Bogeys! 🥏</h1>
      </div>
      {!Auth.loggedIn() && 
      <div className="d-flex justify-content-center p-4">
        <p className="information"> Login or Sign up to use our DiscGolf ScoreKeeper App</p>
      </div>
      }
      {!Auth.loggedIn() && 
      <div className="d-flex justify-content-center">
        <Link to="/login">
          <button className="btn btn-primary d-flex justify-content-center mb-3">
            Login
          </button>
        </Link>
      </div>
        }
        {!Auth.loggedIn() &&
      <div className="d-flex justify-content-center">
        <Link to="/signup">
          <button
            type="button"
            className="btn btn-primary d-flex justify-content-center mb-3">
            Sign up
          </button>
        </Link>
      </div>
        }
      <div className="d-flex justify-content-center">
        <Link to="/viewcourses">
          <button
            type="button"
            className="btn btn-primary d-flex justify-content-center m-4">
            View our Courses
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Home;
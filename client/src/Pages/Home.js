import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

const Home = (props) => {
  return (
    <section>
      <div className="d-flex justify-content-center">
        <h1 className="heading">No Bogeys! 🥏</h1>
      </div>
      {!Auth.loggedIn() && (
        <div className="d-flex justify-content-center p-4">
          <p className="sub-heading">
            {" "}
            Login or Sign up to use our DiscGolf ScoreKeeper App
          </p>
        </div>
      )}
      {!Auth.loggedIn() && (
        <div className="d-flex justify-content-center">
          <Link to="/login" style={{ textDecoration: "none" }}>
            <button className="button d-flex justify-content-center mb-3">
              Login
            </button>
          </Link>
        </div>
      )}
      {!Auth.loggedIn() && (
        <div className="d-flex justify-content-center">
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <button
              type="button"
              className="button d-flex justify-content-center mb-3"
            >
              Sign up
            </button>
          </Link>
        </div>
      )}
      <div className="d-flex justify-content-center">
        <Link to="/viewcourses" style={{ textDecoration: "none" }}>
          <button
            type="button"
            className="button d-flex justify-content-center m-4"
          >
            View our Courses
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Home;

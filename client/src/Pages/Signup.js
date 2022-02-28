import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error }] = useMutation(ADD_USER);
  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // use try/catch instead of promises to handle errors
    try {
      // execute addUser mutation and pass in variable data from form
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className="d-flex justify-content-center">
      <div className="form">
        <div>
          <h2 className="heading d-flex justify-content-center">Sign Up</h2>
          <div className="d-flex justify-content-center">
            <form className="col-12 col-md-3" onSubmit={handleFormSubmit}>
              <input
                className="form-input"
                placeholder="Your username"
                name="username"
                type="username"
                id="username"
                value={formState.username}
                onChange={handleChange}
                autoComplete="on"
              />
              <input
                className="form-input"
                placeholder="Your email"
                name="email"
                type="email"
                id="email"
                value={formState.email}
                onChange={handleChange}
                autoComplete="on"
              />
              <input
                className="form-input"
                placeholder="******"
                name="password"
                type="password"
                id="password"
                value={formState.password}
                onChange={handleChange}
                autoComplete="on"
              />
              {error ? (
                <div>
                  <div
                    className="alert alert-danger text-center  animate__animated animate__shakeX"
                    role="alert"
                  >
                    Signup Failed!
                  </div>
                  <div className="d-flex justify-content-center">
                    <button
                      type="submit"
                      className="button d-flex justify-content-center"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              ) : (
                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="button d-flex justify-content-center"
                  >
                    Submit
                  </button>
                </div>
              )}
              <Link to="/" style={{ textDecoration: "none" }}>
                <div className="d-flex justify-content-center">
                  <button
                    type="button"
                    className="button d-flex justify-content-center"
                  >
                    Go Back
                  </button>
                </div>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;

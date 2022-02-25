import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);

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

    try {
      const { data } = await login({
        variables: { ...formState },
      });
    
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <section className="d-flex justify-content-center">
      <div className="form">
        <div>
          <h2 className="heading d-flex justify-content-center">Login</h2>
          <div className="d-flex justify-content-center">
            <form className="col-12 col-md-6" onSubmit={handleFormSubmit}>
              <input
                className="form-input"
                placeholder="Your email"
                name="email"
                type="email"
                id="email"
                value={formState.email}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="******"
                name="password"
                type="password"
                id="password"
                value={formState.password}
                onChange={handleChange}
              />
              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-primary d-flex justify-content-center"
                >
                  Submit
                </button>
              </div>
              <Link to="/">
            <div className="d-flex justify-content-center">
          <button
          type="button"
          className="btn btn-primary d-flex justify-content-center">
            Go Back
        </button>
        </div>
       </Link>
            </form>
            {error && <div>Login failed</div>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
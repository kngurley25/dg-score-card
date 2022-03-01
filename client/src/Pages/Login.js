import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";

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
    <section className='d-flex flex-column align-items-center'>
      <div className='form'>
        <h2 className='heading d-flex justify-content-center'>Login</h2>
        <div className='d-flex justify-content-center'>
          <form className='col-12 col-md-6' onSubmit={handleFormSubmit}>
            <input
              className='form-input'
              placeholder='Your email'
              name='email'
              type='email'
              id='email'
              value={formState.email}
              onChange={handleChange}
              autoComplete='on'
            />
            <input
              className='form-input'
              placeholder='******'
              name='password'
              type='password'
              id='password'
              value={formState.password}
              onChange={handleChange}
              autoComplete='on'
            />
            {error ? (
              <div>
                <div
                  className='alert alert-danger text-center  animate__animated animate__shakeX'
                  role='alert'
                >
                  Email or Password Incorrect!
                </div>
                <div className='d-flex justify-content-center'>
                  <button
                    type='submit'
                    className='button d-flex justify-content-center'
                  >
                    Submit
                  </button>
                </div>
              </div>
            ) : (
              <div className='d-flex justify-content-center'>
                <button
                  type='submit'
                  className='button d-flex justify-content-center'
                >
                  Submit
                </button>
              </div>
            )}
            <Link to='/' style={{ textDecoration: "none" }}>
              <div className='d-flex justify-content-center'>
                <button
                  type='button'
                  className='button d-flex justify-content-center'
                >
                  Go Back
                </button>
              </div>
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;

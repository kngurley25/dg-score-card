import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Signup = () => {

  const [formState, setFormState] = useState({ username: '', email: '', password: '' });
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
    console.log("what's up?");
    // use try/catch instead of promises to handle errors
    try {
      // execute addUser mutation and pass in variable data from form
      const { data } = await addUser({
        variables: { ...formState }
      });
      Auth.login(data.addUser.token);
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className="d-flex justify-content-center">
        <div className="form">
        <div>
          <h2 className="d-flex justify-content-center">Sign Up</h2>
            <div className="d-flex justify-content-center">
            <form className="col-12 col-md-3" onSubmit={handleFormSubmit}>
              <input
                className='form-input'
                placeholder='Your username'
                name='username'
                type='username'
                id='username'
                value={formState.username}
                onChange={handleChange}
              />
              <input
                className='form-input'
                placeholder='Your email'
                name='email'
                type='email'
                id='email'
                value={formState.email}
                onChange={handleChange}
              />
              <input
                className='form-input'
                placeholder='******'
                name='password'
                type='password'
                id='password'
                value={formState.password}
                onChange={handleChange}
              />
              <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary d-flex justify-content-center">
                Submit
              </button>
            </div>
            </form>
            {error && <div>Sign up failed</div>}
            </div>
            </div>
            </div>
    </section>
  );
};

export default Signup;

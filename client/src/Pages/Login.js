import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Login = (props) => {
  

  return (
    <main class="d-flex justify-content-center">
      <div className="form">
        <div>
          <h2 class="d-flex justify-content-center">Login</h2>
          <div class="d-flex justify-content-center">
            <form class="col-12 col-md-6">
              <input
                className='form-input'
                placeholder='Your email'
                name='email'
                type='email'
                id='email'
              />
              <input
                     className='form-input'
                     placeholder='******'
                     name='password'
                     type='password'
                     id='password'

              />
              <div class="d-flex justify-content-center">
              <button type="button" class="btn btn-primary d-flex justify-content-center" value="submit">
                Submit
              </button>
              </div>
            </form>
          
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;

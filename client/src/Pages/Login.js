import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Login = () => {

  return (
    <main class="d-flex justify-content-center">
      <div>
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
              <button type='submit'>
                Submit
              </button>
            </form>
          
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;

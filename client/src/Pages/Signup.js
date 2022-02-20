import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Signup = () => {




  return (
    <main class="d-flex justify-content-center">
    <div>
        <div>
          <h2 class="d-flex justify-content-center">Sign Up</h2>
          <div class="d-flex justify-content-center">
            <form class="col-12 col-md-6">
              <input
                className='form-input'
                placeholder='Your username'
                name='username'
                type='username'
                id='username'
              />
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
              <div>
              <button type='submit'>
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

export default Signup;

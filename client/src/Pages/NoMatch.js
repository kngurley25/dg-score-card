import React from 'react';
import { Link } from 'react-router-dom';

function NoMatch() {
  return (
    <div className='d-flex flex-column align-items-center'>
      <h1 className='alt-heading animate__animated animate__swing animate__infinite'>
        Page Not Found!
      </h1>
      <Link to='/'>
        <button className='button-go'>Home</button>
      </Link>
    </div>
  );
}

export default NoMatch;

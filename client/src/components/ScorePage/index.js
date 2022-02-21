import React from 'react';
import ScorePageClasses from './ScorePage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

function ScorePage() {
  return (
    <main className={ScorePageClasses.ScorePage}>
      <div className='d-flex flex-column align-items-center'>
        <div className='my-5 text-center'>
          <h1>Hole 1</h1>
          <h2>Par 3</h2>
        </div>
        <p className='fs-3'>Enter Total Strokes:</p>
        <button className='button-stroke text-center w-50'>
          <FontAwesomeIcon icon={faArrowUp} className='fs-1' />
        </button>
        <div className='d-flex justify-content-center my-2'>
          <i class='fa fa-arrow-up' aria-hidden='true'></i>
          {/* <label htmlFor='strokeTotal' /> */}
          <input
            type='number'
            pattern='[0-9]*'
            id='strokeTotal'
            min={1}
            defaultValue={1}
            className='text-center w-50 fs-1 mt-3'
          />
        </div>
        <button className='button-stroke w-50'>
          <FontAwesomeIcon icon={faArrowDown} className='fs-1' />
        </button>
        {/* <div>
          <button className='button-stroke'>
            <p>Add Stroke</p>
          </button>
        </div> */}
        <div>
          <button className='button-next my-5'>
            <p>Next Hole</p>
          </button>
        </div>
      </div>
    </main>
  );
}

export default ScorePage;

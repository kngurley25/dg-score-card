import React, { useEffect, useState } from 'react';
import ScorePageClasses from './ScorePage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

function ScorePage() {
  const [inputValue, setInputValue] = useState(1);

  const addStroke = () => {
    let score = document.getElementById('strokeTotal').value;
    let newScore = ++score;
    return setInputValue(newScore);
  };

  const removeStroke = () => {
    let score = document.getElementById('strokeTotal').value;
    if (score <= 1) {
      alert('Score cannot be less than 1');
      return;
    }
    let newScore = --score;
    return setInputValue(newScore);
  };

  return (
    <main className={ScorePageClasses.ScorePage}>
      <div className='d-flex flex-column align-items-center'>
        <div className='my-5 text-center'>
          <h1>Hole 1</h1>
          <h2>Par 3</h2>
        </div>
        <p className='fs-3'>Enter Total Strokes:</p>
        <button
          id='addBtn'
          className='button-stroke text-center w-50'
          onClick={addStroke}
        >
          <FontAwesomeIcon icon={faArrowUp} className='fs-1' />
        </button>
        <div className='d-flex justify-content-center my-2'>
          <input
            type='number'
            pattern='[0-9]*'
            id='strokeTotal'
            min={1}
            className='text-center w-50 fs-1 mt-3'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <button
          id='subtractBtn'
          className='button-stroke w-50'
          onClick={removeStroke}
        >
          <FontAwesomeIcon icon={faArrowDown} className='fs-1' />
        </button>
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

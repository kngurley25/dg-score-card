import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useMutation } from '@apollo/client';
import { ADD_SCORE } from '../utils/mutations';

function ScorePage() {
  const [holeNumber, setHoleNumber] = useState(1);
  const [stroke, setStroke] = useState(1);

  const [addScore, { error }] = useMutation(ADD_SCORE);

  const addStroke = () => {
    let score = document.getElementById('strokeTotal').value;
    let newScore = ++score;
    return setStroke(newScore);
  };

  const removeStroke = () => {
    let score = document.getElementById('strokeTotal').value;
    if (score <= 1) {
      score = 1;
      return;
    }
    let newScore = --score;
    return setStroke(newScore);
  };

  return (
    <main>
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
            value={stroke}
            onChange={(e) => setStroke(e.target.value)}
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

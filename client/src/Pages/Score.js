import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import ScoreModal from '../components/ScoreModal';


function ScorePage() {
  const [stroke, setStroke] = useState(1);
  const [show, setShow] = useState(true);
  
  const toggleModal = (project, i) => {
    // setCurrentProject({ ...project, index: i });
    setShow(!show);
  };

  const addStroke = () => {
    let score = document.getElementById('strokeTotal').value;
    let newScore = ++score;
    return setStroke(newScore);
  };

  const removeStroke = () => {
    let score = document.getElementById('strokeTotal').value;
    if (score <= 1) {
      alert('Score cannot be less than 1');
      return;
    }
    let newScore = --score;
    return setStroke(newScore);
  };

  return (
    <main>
      <ScoreModal show={show} handleClose={toggleModal} />
      <div className='d-flex flex-column align-items-center'>
        <div className='text-center'>
          <h1>Hole 1</h1>
          <h2>Par 3</h2>
        </div>
        <button
          className='btn btn-secondary btn-lg my-3'
          onClick={() => toggleModal()}
        >
          View Score Card
        </button>
        <p className='fs-3'>Enter Total Strokes:</p>
        <button
          id='addBtn'
          className='button-stroke text-center w-50'
          onClick={addStroke}
        >
          <FontAwesomeIcon icon={faArrowUp} className='fs-1' />
        </button>
        <div className='d-flex justify-content-center my-1'>
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

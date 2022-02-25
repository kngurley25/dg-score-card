import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_SCORE } from '../utils/mutations';
import { QUERY_ROUND } from '../utils/queries';
import ScoreModal from '../components/ScoreModal';
import { useParams, useNavigate } from 'react-router-dom';


function ScorePage() {
  const navigate = useNavigate();
  const { roundId: roundParam } = useParams();
  const [addScore, { error }] = useMutation(ADD_SCORE);

  const { loading, data } = useQuery(QUERY_ROUND, {
    variables: { roundId: roundParam },
  });
  const round = data?.round || {};
  // const totalScore = round.totalScore;
  
    
  const [totalScore, setTotalScore] = useState(0);
  const [holeNumber, setHoleNumber] = useState(1);
  const [stroke, setStroke] = useState(1);
  const [show, setShow] = useState(false);
 

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
      score = 1;
      return;
    }
    let newScore = --score;
    return setStroke(newScore);
  };
  let total;
  const handleAddScore = (event) => {
    event.preventDefault();
    total = totalScore + stroke;


    try {
     addScore({
          variables: { roundId: roundParam , holeNumber, stroke },
      });
      
      setStroke(1);
      if (holeNumber === 18) {
        navigate(`/profile`);
      } else {
        
      setHoleNumber(holeNumber + 1);
      setTotalScore(total)
      }
  } catch (e) {
      console.error(e);
  }
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <main>
      <ScoreModal show={show} handleClose={toggleModal} />
      <div className='d-flex flex-column align-items-center'>
        
        <div className='text-center'>
          <h1>Hole {holeNumber}</h1>
          <h2>{round.courseName}</h2>
          <h3>Total Score: {totalScore}</h3>
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
            step='1'
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
          <button onClick={handleAddScore} className='button-next my-5'>
            <p>Next Hole</p>
          </button>
        </div>
        {error && <div>Something went wront...</div>}
      </div>
    </main>
  );
}

export default ScorePage;

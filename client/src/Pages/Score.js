import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_SCORE } from '../utils/mutations';
import { QUERY_ALL_COURSES, QUERY_ROUND } from '../utils/queries';
import ScoreModal from '../components/ScoreModal';
import { useParams, useNavigate } from 'react-router-dom';

function ScorePage() {
  const navigate = useNavigate();
  const { roundId: roundParam } = useParams();
  const [addScore, { error }] = useMutation(ADD_SCORE, {
    refetchQueries: [QUERY_ROUND],
  });

  const { loading, data } = useQuery(QUERY_ROUND, {
    variables: { roundId: roundParam },
  });
  const round = data?.round || {};

  const { data: courseData } = useQuery(QUERY_ALL_COURSES);
  const courses = courseData?.courses || [];
  const matchingCourse = courses?.find(
    (course) => course?.courseName === round.courseName
  );

  if (!loading) {
    setTimeout(() => {
      setHoleNumber(round.scores.length + 1 || 1);
      setTotalScore(round.totalScore);
    }, 30);
  }

  const [totalScore, setTotalScore] = useState(0);
  const [holeNumber, setHoleNumber] = useState(1);
  const [stroke, setStroke] = useState(3);
  const [show, setShow] = useState(false);

  const toggleModal = (project, i) => {
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
        variables: { roundId: roundParam, holeNumber, stroke },
      });

      setStroke(3);
      if (holeNumber === matchingCourse.holeCount) {
        navigate(`/profile`);
      } else {
        setHoleNumber(holeNumber + 1);
        setTotalScore(total);
      }
    } catch (e) {
      console.error(e);
    }
  };
  const FindPar = (cntCourseName, i) => {
    const holeNum = i;
    for (let i = 0; i < courses.length; i++) {
      const course = courses[i];
      if (cntCourseName === course.courseName) {
        // console.log(course);
        const holePar = course.holes[holeNum].par;
        return holePar;
      }
    }
  };
  const FindParTotal = (cntCourseName, holeNum) => {
    for (let i = 0; i < courses.length; i++) {
      const course = courses[i];
      if (cntCourseName === course.courseName) {
        const holesArr = course.holes;
        let total = 0;
        for (let j = 0; j < holeNum - 1; j++) {
          total += holesArr[j].par;
        }
        return total;
      }
    }
  };

  const findScore = (par) => {
    let score = totalScore - par;
    if (score > 0) {
      return `+${score}`;
    } else if (score < 0) {
      return `${score}`;
    }
    return score;
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <main>
      <ScoreModal
        show={show}
        handleClose={toggleModal}
        round={round}
        FindPar={FindPar}
      />
      <div className='d-flex flex-column align-items-center'>
        <div className='card-heading text-center'>
          <h1 className='alt-heading'>Hole #{holeNumber}</h1>
          <h2 className='alt-sub-heading'>{round.courseName}</h2>
          <h3 className='alt-sub-heading'>
            Total Score:{' '}
            {findScore(FindParTotal(round.courseName, holeNumber), totalScore)}
          </h3>

        </div>
        <button
          className='button-secondary btn-lg my-3'
          onClick={() => toggleModal()}
        >
          View Score Card
        </button>
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
        {error && <div>Something went wrong...</div>}
      </div>
    </main>
  );
}

export default ScorePage;

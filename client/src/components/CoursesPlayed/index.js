import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

function CoursesPlayed({ courses }) {
  return (
    <ul className='list-group list-group-flush text-center'>
      {courses.map((course, i) => (
        <div key={i}>
          <button
            className='favCourse-link list-group-item fs-5 my-2 fw-bold'
            as={Link}
            to={'/'}
            datatype={i}
            key={i}
          >
            {courses}
            <FontAwesomeIcon icon={faArrowRight} className='ps-2' />
          </button>
        </div>
      ))}
    </ul>
  );
}

export default CoursesPlayed;

import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

function CoursesPlayed({ courses }) {
  let removeRepeatCourses = [...new Set(courses)];
  return (
    <ul className='d-flex align-items-center list-group list-group-flush text-center mt-3'>
      {removeRepeatCourses
        .slice(0)
        .reverse()
        .slice(0, 5)
        .map((course, i) => (
          <div key={i}>
            <button
              className='favCourse-link list-group-item fs-5 my-2 fw-bold animate__animated animate__fadeIn animate__delay-1s'
              as={Link}
              to={'/'}
              key={i}
            >
              {course}
              <FontAwesomeIcon icon={faArrowRight} className='ps-2' />
            </button>
          </div>
        ))}
    </ul>
  );
}

export default CoursesPlayed;

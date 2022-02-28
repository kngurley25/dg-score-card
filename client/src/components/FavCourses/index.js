import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faStar as starSolid,
} from '@fortawesome/free-solid-svg-icons';

function FavCourses({ courses }) {
  return (
    <ul className='d-flex align-items-center list-group list-group-flush text-center mt-3'>
      <h2 className='fw-bold bg-white text-decoration-underline'>
        Favorite Courses
      </h2>
      {courses.map((course, i) => (
        <div
          key={course._id}
          className='d-flex align-items-center animate__animated animate__fadeIn animate__delay-1s'
        >
          <FontAwesomeIcon icon={starSolid} />
          <Link to={`/newround/${course._id}`}>
            <button
              className='favCourse-link list-group-item fs-5 my-2 fw-bold'
              datatype={course._id}
            >
              {' ' + course.courseName}
              <FontAwesomeIcon icon={faArrowRight} className='ps-2' />
            </button>
          </Link>
        </div>
      ))}
    </ul>
  );
}

export default FavCourses;

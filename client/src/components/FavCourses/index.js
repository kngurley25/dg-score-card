import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUpRightFromSquare,
  faStar as starSolid,
} from '@fortawesome/free-solid-svg-icons';

function FavCourses({ courses }) {
  return (
    <ul className='list-group list-group-flush text-center'>
      {courses.map((course, i) => (
        <div>
          <FontAwesomeIcon icon={starSolid} />
          <button
            className='favCourse-link list-group-item fs-5 my-2 fw-bold'
            as={Link}
            to={'/'}
            datatype={course._id}
            key={i}
          >
            {course.courseName}
          <FontAwesomeIcon icon={faUpRightFromSquare} className='ps-2' />
          </button>
        </div>
      ))}
    </ul>
  );
}

export default FavCourses;

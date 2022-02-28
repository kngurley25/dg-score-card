import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUpRightFromSquare
} from '@fortawesome/free-solid-svg-icons';
import { faSquareMinus } from '@fortawesome/free-solid-svg-icons'
import { QUERY_ME_COURSES} from "../../utils/queries";
import { REMOVE_COURSE } from '../../utils/mutations';
import { useMutation, useQuery } from '@apollo/client';

function FavCourses({ courses }) {
  const [removeCourse, { err }] = useMutation(REMOVE_COURSE, {
    refetchQueries: [
      QUERY_ME_COURSES
    ],
  });

  const { loading, data } = useQuery(QUERY_ME_COURSES);
  const myCourses = data?.me || {};

  const handleRemoveCourse = (id) =>(e) => {
    e.preventDefault();
    try {
      removeCourse({
        variables: { courseId: id },
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <ul style={{ maxWidth: "350px"}} className='list-group list-group-flush text-center'>
      {myCourses.courses.map((course, i) => (
        <div key={course._id}>
          <Link to={`/newround/${course._id}`}>
          <button
            className='favCourse-link list-group-item fs-5 my-2 fw-bold justify-content-between'
            datatype={course._id}
          >
                     {' ' + course.courseName}
          <FontAwesomeIcon icon={faUpRightFromSquare} className='ps-2' />
          {"  "}
          <div onClick={handleRemoveCourse(course._id)} >
          <FontAwesomeIcon icon={faSquareMinus} />
          </div>
          </button>
          </Link>
          {err && <div>An Error has occurred...</div>}
        </div>
      ))}
    </ul>
  );
}

export default FavCourses;

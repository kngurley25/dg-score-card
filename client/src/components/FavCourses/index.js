import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight, faXmark
} from '@fortawesome/free-solid-svg-icons';
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
    <ul className="d-flex align-items-center list-group list-group-flush text-center mt-3">
      <h2 className='fw-bold bg-white text-decoration-underline'>
        Favorite Courses
      </h2>
      {myCourses.courses.map((course, i) => (
        <div key={course._id}
            className='d-flex align-items-center animate__animated animate__fadeIn animate__delay-1s'>
          <Link to={`/newround/${course._id}`}>
            <button
              className="favCourse-link list-group-item fs-5 my-2 fw-bold justify-content-between"
              datatype={course._id}
            >
              {" " + course.courseName}
              <FontAwesomeIcon icon={faArrowRight} className="ps-2" />
              {"  "}
              <div
                style={{ color: "red", cursor: "pointer" }}
                onClick={handleRemoveCourse(course._id)}
              >
                <FontAwesomeIcon icon={faXmark}/>
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

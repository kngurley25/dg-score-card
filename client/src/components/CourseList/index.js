import React from "react";
//add Link to single course pages
import { Link } from 'react-router-dom';

const CourseList = ({ courses, title }) => {

    if (!courses.length) {
        return <h3 className="d-flex justify-content-center">No Courses Yet</h3>;
       
    }

    return (
        <div>
            <h3>{title}</h3>
            <ul>
            {courses &&
             courses.map(course => (
          <li key={course._id} className="d-flex justify-content-center">
              <Link
              to={`/courses/${course.courseName}`}
              //add a className & add styling in CSS
              className=""
              >
              {course.courseName}, {course.location} 
              </Link>
          </li>
        ))}
        </ul>
        </div>
    )
}

export default CourseList;
import React from "react";
//add Link to single course pages

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
              {course.courseName}, {course.location} 
          </li>
        ))}
        </ul>
        </div>
    )
}

export default CourseList;
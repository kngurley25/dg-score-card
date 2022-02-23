import React from "react";
import CourseForm from "../CreateCourse";




const CourseList = ({ courses, courseName }) => {

    if (!courses.length) {
        return <h3 className="d-flex justify-content-center">No Courses Yet</h3>;
       
    }

    return (
        <div>
            <h3>{courseName}</h3>
        </div>
    )
}

export default CourseList;
import React from "react";
import { Link } from 'react-router-dom';


const CourseList = ({ courses, courseName }) => {


    return (
        <div>
            <h3>{courseName}</h3>
        </div>
    )
}

export default CourseList;
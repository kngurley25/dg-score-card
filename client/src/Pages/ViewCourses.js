import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_COURSES } from '../utils/queries';
import CourseList from '../components/CourseList';




const ViewCourses = () => {
    


return (
    <main>
        <h1 className="d-flex justify-content-center">Courses:</h1>
        {
           <CourseList></CourseList>
        }
    </main>
)
};

export default ViewCourses;
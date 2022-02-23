import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_COURSES } from '../utils/queries';
import CourseList from '../components/CourseList';
import CourseForm from '../components/CreateCourse';

const ViewCourses = () => {
    
    const {loading, data} = useQuery(QUERY_COURSES);
    const courses = data?.courses || [];

return (
    <main>
        <h1 className="d-flex justify-content-center">Courses:</h1>
        {loading ? (
            <div>Loading. . .</div>
        ) : (
           <CourseList courses={courses}></CourseList>
          
          
        )}
         
    </main>
)
};

export default ViewCourses;
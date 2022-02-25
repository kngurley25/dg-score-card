import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_COURSES } from '../utils/queries';
import CourseList from '../components/CourseList';


const ViewCourses = () => {
    
    const {loading, data} = useQuery(QUERY_ALL_COURSES);
    const courses = data?.courses || [];

return (
    <main>
        <h1 className="d-flex justify-content-center">No Bogeys!</h1>
        {loading ? (
            <div>Loading. . .</div>
        ) : (
            <div className="d-flex justify-content-center">
           <CourseList courses={courses} title="Disc Golf Courses:" ></CourseList>
            </div>
        )}
         
    </main>
)
};

export default ViewCourses;
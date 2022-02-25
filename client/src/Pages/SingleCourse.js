import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_COURSES } from '../utils/queries';
//import CourseList from '../components/CourseList';

const SingleCourse = props => {
    const { id: courseName } = useParams();
  
    const { loading, data } = useQuery(QUERY_ALL_COURSES, {
      variables: { id: courseName }
    });
    
    const course = data?.course || {};
    if(loading) {
      return <div>Loading. . . </div>
    }
    return (
      <div>DG Course: {course.courseName}</div>
    )

  };
  
  export default SingleCourse;
  
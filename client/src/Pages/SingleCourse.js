import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_COURSE } from '../utils/queries';
//import CourseList from '../components/CourseList';

const SingleCourse = props => {
    const { id: courseName } = useParams();
  
    const { loading, data } = useQuery(QUERY_COURSE, {
      variables: { id: courseName }
    });
    
    const course = data?.course || {};
    if(loading) {
      return <div>Loading. . . </div>
    }
    return (
      <div>DG Course: {course}</div>
    )

  };
  
  export default SingleCourse;
  
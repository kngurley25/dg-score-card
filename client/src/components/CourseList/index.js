import React from 'react';
import { Link } from 'react-router-dom';
import {
  MDBCard,
  MDBCardHeader,
  MDBListGroup,
  MDBListGroupItem,
} from 'mdb-react-ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const CourseList = ({ courses, title }) => {
  if (!courses.length) {
    return (
      <div className='d-flex flex-column align-items-center'>
        <h3 className='bg-white mt-5'>No Courses Yet</h3>
        <h3 className='text-center bg-white'>
          Login or signup to create a course and start playing!
        </h3>
        <div>
          <Link to={'/login'} className='mx-4'>
            <button className='btn btn-primary'>Login</button>
          </Link>
          <Link to={'/signup'} className='mx-4'>
            <button className='btn btn-primary'>Signup</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section>
      <div>
        <Link to='/'>
          <div className='d-flex justify-content-center'>
            <button
              type='button'
              className='btn btn-primary d-flex justify-content-center'
            >
              Go Back
            </button>
          </div>
        </Link>
      </div>
      <MDBCard style={{ width: '18rem' }}>
        <MDBCardHeader className='text-center'>{title}</MDBCardHeader>
        <MDBListGroup flush>
          {courses &&
            courses.map((course) => (
              <MDBListGroupItem key={course._id} className='courseList list'>
                <div className='d-flex justify-content-around'>
                  <button className='courseBtn fw-bold'>
                    {course.courseName}, {course.location}
                  </button>
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>
              </MDBListGroupItem>
            ))}
        </MDBListGroup>
      </MDBCard>
    </section>
  );
};

export default CourseList;

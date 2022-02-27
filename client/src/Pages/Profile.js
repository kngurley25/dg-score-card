import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { QUERY_ME, QUERY_ALL_COURSES } from '../utils/queries';
import { useQuery } from '@apollo/client';

import HistoryModal from '../components/HistoryModal';
import CoursesPlayed from '../components/CoursesPlayed';
import HistoryTable from '../components/HistoryTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

function Profile() {
  const [show, setShow] = useState(false);
  const { loading, data } = useQuery(QUERY_ME, {});
  const { data: allCorseData } = useQuery(QUERY_ALL_COURSES);
  const user = data?.me || {};
  const allCourses = allCorseData?.courses || [];

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user?.username) {
    return (
      <div className='d-flex flex-column align-items-center'>
        <h4 className='loginMsg fw-bold'>
          You need to be logged in to see this page. Use the navigation links
          above to sign up or log in!
        </h4>
        <Link to={'/login'} className='my-2'>
          <button className='btn btn-primary'>Login</button>
        </Link>
      </div>
    );
  }

  const toggleModal = () => {
    setShow(!show);
  };

  const FindParTotal = (cntCourseName) => {
    for (let i = 0; i < allCourses.length; i++) {
      const course = allCourses[i];
      if (cntCourseName === course.courseName) {
        const holesArr = course.holes;
        let total = 0;
        for (let j = 0; j < holesArr.length; j++) {
          total += holesArr[j].par;
        }
        return total;
      }
    }
  };
  return (
    <section className='d-flex justify-content-center'>
      <HistoryModal
        show={show}
        handleClose={toggleModal}
        user={user}
        allCourses={allCourses}
        FindParTotal={FindParTotal}
      />
      <div className=' flex-column'>
        <div className='d-flex flex-column align-items-center'>
          <h1 className='text-center bg-white heading'>
            Welcome {user.username}!
          </h1>
          <Link to={'/viewcourses'}>
            <button className='button-next my-4' as={NavLink} to={'/'}>
              Find a New Course
            </button>
          </Link>
        </div>
        <div>
          <h2 className='text-center bg-white'>or</h2>
          <h2 className='text-center bg-white'>
            <FontAwesomeIcon icon={faArrowDown} /> replay a recent course{' '}
            <FontAwesomeIcon icon={faArrowDown} />
          </h2>
          {user.courses.length === 0 ? (
            <div className='text-center bg-white'>
              No courses played yet
            </div>
          ) : (
            <CoursesPlayed courses={user.coursesPlayed} />
          )}
        </div>
        <div>
          <HistoryTable user={user} FindParTotal={FindParTotal} />
          <h3
            className='history-btn text-center my-5 bg-white'
            onClick={() => toggleModal()}
          >
            View more history
          </h3>
        </div>
      </div>
    </section>
  );
}

export default Profile;

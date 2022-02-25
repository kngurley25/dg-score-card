import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import Auth from '../utils/auth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare, faStar } from '@fortawesome/free-solid-svg-icons';

import HistoryModal from '../components/HistoryModal';

function Profile(props) {
  const { loading, data } = useQuery(QUERY_USER, {
    variables: { username: 'Cesar_Wisoky' },
  });
  const user = data?.user || [];
  const courses = data?.user.courses || [];

  // console.log(user);
  // console.log(courses);

  const [show, setShow] = useState(false);
  const toggleModal = () => {
    setShow(!show);
  };
  return (
    <section className='d-flex justify-content-center'>
      <HistoryModal show={show} handleClose={toggleModal} user={user} />
      <div className='flex-column'>
        <h1 className='text-center mt-4'>Welcome {user.username}!</h1>
        <div className='d-flex justify-content-center'>
          <Link to={'/viewcourses'}>
            <button className=' button-next my-4'>Find a New Course</button>
          </Link>
        </div>
        <div>
          <h2 className='text-center'>or</h2>
          <h2 className='text-center'>stick with a favorite</h2>
          <ul className='list-group list-group-flush text-center'>
            {courses.map((course, i) => (
              <button
                className='favCourse-link list-group-item fs-5 my-2 fw-bold'
                as={Link}
                to={'/'}
                datatype={course._id}
                key={i}
              >
                <FontAwesomeIcon icon={faStar} className='' />
                {course.courseName}
                <FontAwesomeIcon icon={faUpRightFromSquare} className='ps-2' />
              </button>
            ))}
          </ul>
        </div>
        <div>
          <h3
            className='history-btn text-center my-5'
            onClick={() => toggleModal()}
          >
            View my History
          </h3>
        </div>
      </div>
    </section>
  );
}

export default Profile;

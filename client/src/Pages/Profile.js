import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

import HistoryModal from '../components/HistoryModal';

function Profile(props) {
  const { username: userParam } = useParams();
  const [show, setShow] = useState(false);

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  // if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
  //   return <Link to='/profile' />;
  // }

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (!user?.username) {
  //   return (
  //     <div className='d-flex justify-content-center'>
  //       <h4 className='text-center w-75'>
  //         You need to be logged in to see this. Use the navigation links above
  //         to sign up or log in!
  //       </h4>
  //     </div>
  //   );
  // }

  const toggleModal = () => {
    setShow(!show);
  };
  return (
    <section className='d-flex justify-content-center'>
      <HistoryModal show={show} handleClose={toggleModal} />
      <div className=' flex-column'>
        <h1 className='text-center'>Welcome Username!</h1>
        <Link to={'/'}>
          <button className='button-next my-4'>Find a New Course</button>
        </Link>
        <div>
          <h2 className='text-center'>or</h2>
          <h2 className='text-center'>stick with a favorite</h2>
          <ul className='list-group list-group-flush text-center'>
            <Link to={'/'}>
              <button className='favCourse-link list-group-item fs-2 my-2'>
                Course Name
                <FontAwesomeIcon icon={faUpRightFromSquare} className='ps-2' />
              </button>
            </Link>
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

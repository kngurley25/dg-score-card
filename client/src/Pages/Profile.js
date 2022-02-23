import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import HistoryModal from '../components/HistoryModal';

function Profile() {
    const [show, setShow] = useState(false);

    const toggleModal = () => {
      setShow(!show);
    };
  return (
    <section className='d-flex justify-content-center'>
      <HistoryModal show={show} handleClose={toggleModal} />
      <div className=' flex-column'>
        <h1 className='text-center'>Welcome Username!</h1>
        <button className='button-next my-4' as={NavLink} to={'/'}>
          Find a New Course
        </button>
        <div>
          <h2 className='text-center'>or</h2>
          <h2 className='text-center'>stick with a favorite</h2>
          <ul className='list-group list-group-flush text-center'>
            <button
              className='favCourse-link list-group-item fs-2 my-2'
              as={NavLink}
              to={'/'}
            >
              Course Name
              <FontAwesomeIcon icon={faUpRightFromSquare} className='ps-2' />
            </button>
            <button
              className='favCourse-link list-group-item fs-2 my-2'
              as={NavLink}
              to={'/'}
            >
              Course Name
              <FontAwesomeIcon icon={faUpRightFromSquare} className='ps-2' />
            </button>
            <button
              className='favCourse-link list-group-item fs-2 my-2'
              as={NavLink}
              to={'/'}
            >
              Course Name
              <FontAwesomeIcon icon={faUpRightFromSquare} className='ps-2' />
            </button>
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

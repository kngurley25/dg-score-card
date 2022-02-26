import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import ModalClasses from './HistoryModal.css';
import { useQuery } from '@apollo/client';
import { QUERY_COURSE, QUERY_ALL_COURSES } from '../../utils/queries';

function HistoryModal({ show, handleClose, user, allCourses }) {
  console.log(allCourses);

  const FindCourseId = (cntCourseName) => {
    // console.log(allCourses);
    // console.log(cntCourseName);
    for (let i = 0; i < allCourses.length; i++) {
      const element = allCourses[i];
      // console.log(element.courseName);
      if (cntCourseName === element.courseName) {
        console.log(element._id);
        // const { loading, data: courseData } = useQuery(QUERY_COURSE, {
        //   variables: { _id: element._id },
        // });

        // const course = courseData?.course || [];

        // console.log(course);
      }
    }
  };

  return (
    <div className={ModalClasses.HistoryModal}>
      <Modal
        show={show}
        onHide={handleClose}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Round History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover size='sm'>
            <thead>
              <tr>
                <th scope='col'>Date</th>
                <th scope='col'>Course Name</th>
                <th scope='col'>Par</th>
                <th scope='col'>Score</th>
              </tr>
            </thead>
            <tbody>
              {user.rounds.map((round, i) => (
                <tr key={i}>
                  <th scope='row'>{round.createAt.split('at')[0]}</th>
                  <td>{round.courseName}</td>
                  <td>{FindCourseId(round.courseName)}</td>
                  <td>totalScore</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </div>
  );
}
export default HistoryModal;

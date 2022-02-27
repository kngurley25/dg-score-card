import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import ModalClasses from './HistoryModal.css';

function HistoryModal({ show, handleClose, user, allCourses }) {
  // console.log(user);
  // console.log(allCourses);

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
                  <td id='parTotal'>{FindParTotal(round.courseName)}</td>
                  <td>{round.totalScore}</td>
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

import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { dateFormat } from '../../utils/helpers';

function HistoryModal({ show, handleClose, user, allCourses, FindParTotal }) {
  return (
    <div>
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
              {user.rounds
                .slice(0)
                .reverse()
                .slice(3)
                .map((round, i) => (
                  <tr key={i}>
                    <td>{dateFormat(round.createAt)}</td>
                    <td>{round.courseName}</td>
                    <td>{FindParTotal(round.courseName)}</td>
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

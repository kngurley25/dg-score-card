import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import ModalClasses from './HistoryModal.css';

function HistoryModal({ show, handleClose, user }) {

  console.log(user);

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
                  <td>{user.round.courseName}</td>
                  <td>72</td>
                  <td>{user.round.totalScore}</td>
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

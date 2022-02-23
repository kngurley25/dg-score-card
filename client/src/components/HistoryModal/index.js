import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import ModalClasses from './HistoryModal.css';

function HistoryModal({ show, handleClose }) {
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
        <Modal.Body scrollable>
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
              <tr>
                <th scope='row'>1/1/2022</th>
                <td>Course Name</td>
                <td>72</td>
                <td>80</td>
              </tr>
              <tr>
                <th scope='row'>1/1/2022</th>
                <td>Course Name</td>
                <td>72</td>
                <td>80</td>
              </tr>
              <tr>
                <th scope='row'>1/1/2022</th>
                <td>Course Name</td>
                <td>72</td>
                <td>80</td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </div>
  );
}
export default HistoryModal;

import React from 'react';
import Modal from 'react-bootstrap/Modal';

function ScoreModal({ show, handleClose }) {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Scorecard</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th scope='col'>Hole #</th>
              <th scope='col'>Par</th>
              <th scope='col'>Strokes</th>
              <th scope='col'>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope='row'>1</th>
              <td>3</td>
              <td>4</td>
              <td>+1</td>
            </tr>
            <tr>
              <th scope='row'>2</th>
              <td>4</td>
              <td>3</td>
              <td>0</td>
            </tr>
            <tr>
              <th scope='row'>3</th>
              <td>3</td>
              <td>2</td>
              <td>-1</td>
            </tr>
          </tbody>
        </table>
      </Modal.Body>
    </Modal>
  );
}

export default ScoreModal;

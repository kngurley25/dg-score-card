import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

function ScoreModal({ show, handleClose, round, FindPar }) {
  let total = 0;
  const findScoreTotal = (cntStrokes, i) => {
    const par = FindPar(round.courseName, i);
    total += cntStrokes - par;
    if (total <= 0) {
      return total;
    } else {
      return `+${total}`;
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      className='scoreModal'
    >
      <Modal.Header closeButton>
        <Modal.Title>Scorecard</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover size='sm'>
          <thead>
            <tr className='text-center'>
              <th scope='col'>Hole #</th>
              <th scope='col'>Par</th>
              <th scope='col'>Strokes</th>
              <th scope='col'>Total</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {round.scores.map((score, i) => (
              <tr key={i}>
                <th scope='row'>{score.holeNumber}</th>
                <td>{FindPar(round.courseName, i)}</td>
                <td>{score.stroke}</td>
                <td>{findScoreTotal(score.stroke, i)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
}

export default ScoreModal;

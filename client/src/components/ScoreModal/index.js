import React from 'react';
import { QUERY_ALL_COURSES } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

function ScoreModal({ show, handleClose, round }) {
  const { data: allCorseData } = useQuery(QUERY_ALL_COURSES);
  const allCourses = allCorseData?.courses || [];

  const FindPar = (cntCourseName, i) => {
    const holeNum = i
    for (let i = 0; i < allCourses.length; i++) {
      const course = allCourses[i];
      if (cntCourseName === course.courseName) {
        const holePar = course.holes[holeNum].par;
        return holePar
      }
    }
  };
  
  let total = 0
  const findScoreTotal = (cntStrokes) => {
    total += cntStrokes
    return total
  }

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
                <td>{findScoreTotal(score.stroke)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
}

export default ScoreModal;

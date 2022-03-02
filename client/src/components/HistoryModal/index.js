import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { dateFormat } from '../../utils/helpers';
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_ROUND } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function HistoryModal({ show, handleClose, findScore, FindParTotal }) {
  const { loading, data } = useQuery(QUERY_ME);
  const updatedUser = data?.me || {};
    const [deleteRound, { err }] = useMutation(DELETE_ROUND, {
      refetchQueries: [
        QUERY_ME
      ],
    });

    const handleDeleteRound = (id) =>(e) => {
      e.preventDefault();
      try {
        console.log(id);
        deleteRound({
          variables: { roundId: id },
        });
      } catch (err) {
        console.error(err);
      }
    };

      if (loading) {
        return (
          <div className='d-flex justify-content-center'>
            <h1 className='alt-heading animate__animated  animate__bounce'>
              Loading...
            </h1>
          </div>
        );
      }

  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Round History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Course Name</th>
                <th scope="col">Par</th>
                <th scope="col">Score</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {updatedUser.rounds
                .slice(0)
                .reverse()
                .slice(3)
                .map((round, i) => (
                  <tr key={i}>
                    <td>{dateFormat(round.createAt)}</td>
                    <td>{round.courseName}</td>
                    <td>{FindParTotal(round.courseName)}</td>
                    <td>
                      {findScore(
                        round.totalScore,
                        FindParTotal(round.courseName)
                      )}
                    </td>

                    <td>
                      <div
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={handleDeleteRound(round._id)}
                      >
                        <FontAwesomeIcon icon={faTrash}/>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
            {err && <div>An Error has occurred...</div>}
          </Table>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default HistoryModal;

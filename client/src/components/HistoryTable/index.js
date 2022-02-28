import React, {useState} from 'react';
import { dateFormat } from '../../utils/helpers';
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_ROUND } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

function HistoryTable({ user, FindParTotal }) {
    const [query, setQuery] = useState('');

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
      return <div>Loading...</div>;
    }

  return (
    <div className='d-flex flex-column align-items-center'>
      <h3 className='subheading mt-5 text-center'>Round History</h3>
      <input
        className='w-75'
        placeholder='Search for round'
        onChange={(event) => setQuery(event.target.value)}
      />
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>Date</th>
            <th scope='col'>Course Name</th>
            <th scope='col'>Par</th>
            <th scope='col'>Score</th>
            <th scope='col'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {updatedUser.rounds
            .filter((rounds) => {
              if (query === '') {
                return rounds;
              } else if (
                rounds.courseName.toLowerCase().includes(query.toLowerCase())
              ) {
                return rounds;
              }
              return rounds;
            })
            .slice(0)
            .reverse()
            .slice(0, 3)
            .map((round, i) => (
              <tr key={i}>
                <td>{dateFormat(round.createAt)}</td>
                <td>{round.courseName}</td>
                <td>{FindParTotal(round.courseName)}</td>
                <td>{round.totalScore}</td>
                <td>
                  <div style={{ color: "red", cursor: "pointer" }} onClick={handleDeleteRound(round._id)}>
                    ⮿
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {err && <div>An Error has occurred...</div>}
    </div>
  );
}

export default HistoryTable;

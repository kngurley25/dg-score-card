import React, {useState} from 'react';
import { dateFormat } from '../../utils/helpers';

function HistoryTable({ user, FindParTotal }) {
  const [query, setQuery] = useState('');
  return (
    <div className='d-flex flex-column align-items-center'>
      <h3 className='subheading mt-5 p-2 text-center bg-white'>Round History</h3>
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
          </tr>
        </thead>
        <tbody>
          {user.rounds
            .filter((rounds) => {
              if (query === '') {
                return rounds;
              } else if (
                rounds.courseName.toLowerCase().includes(query.toLowerCase())
              ) {
                return rounds;
              }
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
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default HistoryTable;

import React from 'react';
import { dateFormat } from '../../utils/helpers';

function HistoryTable({ user, FindParTotal }) {
  return (
    <div>
      <h3 className='subheading mt-5 text-center'>Round History</h3>
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

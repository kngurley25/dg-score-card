import React from 'react';
import ScorePageClasses from './ScorePage.css';

function ScorePage() {
  return (
    <main className={ScorePageClasses.ScorePage}>
      <h1>Hole 1</h1>
      <h2>Par 3</h2>
      <div>
        <a className='button-stroke'>
          <p>Add Stroke</p>
        </a>
      </div>
      <div>
        <h3>
          Current Stroke Count: <span>2</span>
        </h3>
      </div>
      <div>
        <a className='button-next'>Next Hole</a>
      </div>
    </main>
  );
}

export default ScorePage;

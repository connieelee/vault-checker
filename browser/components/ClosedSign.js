import React from 'react';

import FranklinHours from './FranklinHours';
import CanalHours from './CanalHours';

const ClosedSign = ({ location }) => (
  <div className="tweet-card closed-sign">
    <h2>we're closed right now!</h2>
    <p>open hours:</p>
    <hr />
    {
      location === 'franklin' ?
      <FranklinHours /> :
      <CanalHours />
    }
  </div>
);

export default ClosedSign;

import React from 'react';

const VaultDisplay = ({ location, status }) => (
  <div className={`${location}-vault`}>
    <img
      className={`img-center ${location}-header`}
      src={`/images/${location}.png`}
      alt={`${location} vault`}
    />
    <img
      className={`img-center status-${status}`}
      src={`/images/${status}.png`}
      alt={status}
    />
  </div>
);

export default VaultDisplay;

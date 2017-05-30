import React from 'react';

const VaultDisplay = ({ location, containerStyles, status, headerColor }) => (
  <div className={containerStyles}>
    <div className="vault-img-group">
      <h1 className={`text-center location-header ${headerColor}`}>
        {location} vault
      </h1>
      <img
        className="img-center status-img"
        src={`/images/${status}.png`}
        alt={status}
      />
    </div>
  </div>
);

export default VaultDisplay;

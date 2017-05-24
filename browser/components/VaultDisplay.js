import React from 'react';

const VaultDisplay = ({ location, containerStyles, status }) => (
  <div className={containerStyles}>
    <div className="vault-img-group">
      <img
        className={`img-center ${location}-header`}
        src={`/images/${location}.png`}
        alt={`${location} vault`}
      />
      {/*<h1 className="text-center location-header">
        {location} vault
      </h1>*/}
      <img
        className="img-center status-img"
        src={`/images/${status}.png`}
        alt={status}
      />
    </div>
  </div>
);

export default VaultDisplay;

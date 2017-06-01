import React from 'react';

const VaultDisplay = ({ location, containerStyles, headerColor, specials, soldOut }) => (
  <div className={containerStyles}>
    <div className="vault-img-group">
      <h1 className={`text-center location-header ${headerColor}`}>
        {location} vault
      </h1>
      <div className="tweet-card">
        <h3>{specials.text}</h3>
        <p>{specials.time}</p>
      </div>
      <div className="tweet-card">
        <h3>{soldOut.text}</h3>
        <p>{soldOut.time}</p>
      </div>
    </div>
  </div>
);

export default VaultDisplay;

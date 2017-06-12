import React from 'react';

import TweetCard from './TweetCard';
import ClosedSign from './ClosedSign';

import { isOpen } from '../utils';

const VaultDisplay = ({ location, containerStyles, headerColor, specials, soldOut }) => (
  <div className={containerStyles}>
    <div className="vault-img-group">
      <h1 className={`text-center location-header ${headerColor}`}>
        {location} vault
      </h1>
      {
        !isOpen(location) ? <ClosedSign location={location} /> :
        <div>
          <TweetCard text={specials.text} time={specials.time} />
          <TweetCard text={soldOut.text} time={soldOut.time} />
        </div>
      }
    </div>
  </div>
);

export default VaultDisplay;

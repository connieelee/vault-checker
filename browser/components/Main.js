import React from 'react';
import axios from 'axios';

import VaultDisplay from './VaultDisplay';
import { getLocation, isSoldOut, areBothSoldOut, isOpen } from '../utils';

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      franklin: 'open',
      canal: 'open',
      lastUpdated: new Date(),
    };
  }

  componentDidMount() {
    const nextState = {};
    if (!isOpen('franklin')) nextState.franklin = 'closed';
    if (!isOpen('canal')) nextState.canal = 'closed';

    axios.get('/twitterapi/vaulttweetstoday')
      .then(res => res.data)
      .then(tweets => {
        for (let i = 0; i < tweets.length && !areBothSoldOut(nextState); i++) {
          const location = getLocation(tweets[i]);
          if (!location) return;
          const soldOut = isSoldOut(tweets[i]);
          if (soldOut) nextState[location] = 'sold-out';
        }

        this.setState(nextState);
      });
  }

  render() {
    return (
      <div className="container">
        <VaultDisplay location="franklin" status={this.state.franklin} />
        <VaultDisplay location="canal" status={this.state.canal} />
      </div>
    );
  }
}

export default Main;

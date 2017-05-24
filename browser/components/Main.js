import React from 'react';
import axios from 'axios';
import moment from 'moment';

import VaultDisplay from './VaultDisplay';
import { getLocation, isSoldOut, areBothSoldOut, isOpen } from '../utils';

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      franklin: 'loading',
      canal: 'loading',
      lastUpdated: new Date(),
    };
  }

  componentDidMount() {
    const nextState = { franklin: 'open', canal: 'open' };
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
        <VaultDisplay
          location="franklin"
          containerStyles="left light-pink-bg"
          status={this.state.franklin}
        />
        <VaultDisplay
          location="canal"
          containerStyles="right _-bg"
          status={this.state.canal}
        />
        <div className="timestamp pink-bg text-center">
          <h3>Last updated:</h3>
          <h1>{moment(this.state.lastUpdated).format('h:mma')}</h1>
        </div>
      </div>
    );
  }
}

export default Main;

import React from 'react';
import axios from 'axios';

import FranklinVault from './FranklinVault';
import CanalVault from './CanalVault';

class Main extends React.Component {
  constructor() {
    super();

  this.state = {
      franklin: 'loading',
      canal: 'loading',
    };
  }

  componentDidMount() {
    /* TODO: time check based on hours of each location */

    axios.get('/twitterapi/vaulttweetstoday')
      .then(res => res.data)
      .then(tweets => {
        const nextState = Object.assign({}, this.state);
        tweets.forEach(tweet => {
          const isFranklin = tweet => tweet.text.indexOf('#FranklinVault') > -1;
          const isCanal = tweet => tweet.text.indexOf('#CanalVault') > -1;
          const isSoldOut = tweet => tweet.text.toLowerCase().indexOf('sold out') > -1;

          if (isFranklin && isSoldOut(tweet)) nextState.franklin = 'sold out';
          if (isCanal && isSoldOut(tweet)) nextState.canal = 'sold out';
        });

        this.setState(nextState);
      });
  }

  render() {
    return (
      <div className="container">
        <FranklinVault status={this.state.franklin} />
        <CanalVault status={this.state.canal} />
      </div>
    );
  }
}

export default Main;

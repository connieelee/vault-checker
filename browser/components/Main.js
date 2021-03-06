import React from 'react';
import axios from 'axios';
import moment from 'moment';

import VaultDisplay from './VaultDisplay';
import defaultState from '../defaultState';
import { isOpen, getLocation, isSoldOut, listsSpecials } from '../utils';

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      franklin: { specials: {}, soldOut: {} },
      canal: { specials: {}, soldOut: {} },
      lastUpdated: moment(new Date()).format('h:mma'),
    };
  }

  componentDidMount() {
    if (isOpen('franklin') || isOpen('canal')) {
      axios.get('/twitterapi/vaulttweetstoday')
        .then(res => res.data)
        .then(tweets => {
          const nextState = defaultState;
          tweets.forEach(tweet => {
            const location = getLocation(tweet);
            if (location) {
              const slimTweet = {
                text: tweet.text,
                time: moment(tweet.created_at).format('h:mma'),
              };

              if (listsSpecials(tweet)) nextState[location].specials = slimTweet;
              if (isSoldOut(tweet)) nextState[location].soldOut = slimTweet;
            }
          });

          this.setState(nextState);
        });
    }
  }

  render() {
    return (
      <div className="container">
        <VaultDisplay
          location="franklin"
          containerStyles="left vertical-half blue-bg"
          headerColor="light-pink"
          {...this.state.franklin}
        />
        <VaultDisplay
          location="canal"
          containerStyles="right vertical-half light-pink-bg"
          headerColor="blue"
          {...this.state.canal}
        />
        <div className="timestamp pink-bg text-center">
          <h3>Last updated:</h3>
          <h2>{this.state.lastUpdated}</h2>
        </div>
      </div>
    );
  }
}

export default Main;

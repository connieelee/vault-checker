import React from 'react';

const TweetCard = ({ text, time }) => (
  <div className={`tweet-card ${!time ? 'grey' : ''}`}>
    <h3>{text}</h3>
    <p>{time}</p>
  </div>
);

export default TweetCard;

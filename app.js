const express = require('express');
const morgan = require('morgan');
const path = require('path');
const chalk = require('chalk');
const moment = require('moment');
const axios = require('axios');

const app = express();
const twitterBearerToken = process.env.TWITTER_BEARER_TOKEN ?
                           process.env.TWITTER_BEARER_TOKEN :
                           require('./secrets').bearer_token_creds;

axios({
  method: 'post',
  url: 'https://api.twitter.com/oauth2/token',
  headers: {
    Authorization: `Basic ${new Buffer(twitterBearerToken).toString('base64')}`,
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  },
  data: 'grant_type=client_credentials',
})
.then(res => res.data)
.then(({ access_token: accessToken }) => {
  app.use(morgan('dev'));
  app.use(express.static('public'));

  app.get('/twitterapi/vaulttweetstoday', (req, res, next) => {
    const today = moment(new Date()).format();
    const formattedDate = today.slice(0, 10);

    axios({
      method: 'get',
      url: `https://api.twitter.com/1.1/search/tweets.json?l=&q=from%3Adoughnutvault
            %20since%3A${formattedDate}&src=typd&include_entities=false`,
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then(response => res.send(response.data.statuses))
    .catch(next);
  });

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './browser/index.html'));
  });

  app.use((err, req, res) => {
    res.status(err.status || 500).send(err.message);
  });

  app.listen(process.env.PORT || 3000, () => {
    console.log(chalk.cyan(`Listening on port ${process.env.PORT || 3000}!`));
  });
})
.catch(console.error);

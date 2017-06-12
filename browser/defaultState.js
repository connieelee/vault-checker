import moment from 'moment';
import { isOpen } from './utils';

const defaultMsgs = location => {
  if (!isOpen(location)) return {};
  return {
    specials: {
      text: 'Today\'s specials haven\'t been tweeted. ' +
            'Check back again later?',
    },
    soldOut: { text: 'Not sold out yet, hurry in!' },
  };
};

const defaultState = {
  franklin: defaultMsgs('franklin'),
  canal: defaultMsgs('canal'),
  lastUpdated: moment(new Date()).format('h:mma'),
};

export default defaultState;

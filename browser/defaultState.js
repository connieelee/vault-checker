import moment from 'moment';
import { isOpen } from './utils';

const defaultMsgs = location => {
  if (!isOpen(location)) return {};
  return {
    specials: {
      text: 'The specials haven\'t been posted yet. ' +
            'Hang on tight and check back again soon!',
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

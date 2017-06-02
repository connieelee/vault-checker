import moment from 'moment';
import { isOpen } from './utils';

const defaultMsg = () => ({
  specials: {
    text: 'The specials haven\'t been posted yet. ' +
          'Hang on tight and check back again soon!',
  },
  soldOut: { text: 'Not sold out yet, hurry in!' },
});

const initialState = {
  franklin: isOpen('franklin') ? defaultMsg() : {},
  canal: isOpen('canal') ? defaultMsg() : {},
  lastUpdated: moment(new Date()).format('h:mma'),
};

export default initialState;

import moment from 'moment';

export const franklin = {
  weekday: {
    open: moment({ hour: 8, minute: 0 }),
    close: moment({ hour: 16, minute: 0 }), //technically until sold out
  },
  weekend: {
    open: moment({ hour: 9, minute: 30 }),
    close: moment({ hour: 16, minute: 0 }), //technically until sold out
  },
};

export const canal = {
  weekday: {
    open: moment({ hour: 7, minute: 0 }),
    close: moment({ hour: 17, minute: 0 }),
  },
  weekend: 'closed',
};

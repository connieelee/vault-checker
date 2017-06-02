import moment from 'moment';
import * as hours from './vaultHours';

export const getLocation = tweet => {
  if (tweet.text.indexOf('#FranklinVault') > -1) return 'franklin';
  if (tweet.text.indexOf('#CanalVault') > -1) return 'canal';
  return null;
};

export const listsSpecials = tweet => tweet.text.toLowerCase().indexOf('special') > -1;
export const isSoldOut = tweet => tweet.text.toLowerCase().indexOf('sold out') > -1;

export const isWeekend = day => day === 'Sat' || day === 'Sun';
export const isOpen = location => {
  const dayOfWeek = moment().format('ddd');
  const now = moment(Date.now());

  let dayType = 'weekday';
  if (isWeekend(dayOfWeek)) {
    if (location === 'canal') return false;
    dayType = 'weekend';
  }

  return now.isAfter(hours[location][dayType].open)
      && now.isBefore(hours[location][dayType].close);
};

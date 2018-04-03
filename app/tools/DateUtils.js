import dateformat from 'dateformat';

export const formatDate = (date) =>  {
  return dateformat(date, 'dd.mm.yyyy');
};

export const formatTime = (date) => {
  return dateformat(date, 'HH:MM');
};

export const clone = (date) =>  {
  return new Date(date.getTime());
};


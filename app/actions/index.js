export const PEOPLE_FETCHED   = 'PEOPLE_FETCHED';
export const PEOPLE_FAILED    = 'PEOPLE_FAILED';
export const EVENTS_FETCHED   = 'EVENTS_FETCHED';
export const EVENTS_FAILED    = 'EVENTS_FAILED';

import * as config from '../config/config';

export function getPeople() {
  return (dispatch) => {
    fetch(config.personsUrl)
      .then(res => res.json())
      .then(res => {
        dispatch({type: PEOPLE_FETCHED, data:res});
      })
      .catch(error => {
        dispatch({type: PEOPLE_FAILED, data:error});
      });
  };
}

export function getEvents() {
  const sortEvents = (one, other) => {
    if (one.start === other.start) {
      return 0;
    } else if (one.start < other.start) {
      return -1;
    } else {
      return 1;
    }
  };
  
  return (dispatch) => {
    fetch(config.eventsUrl)
      .then(res => res.json())
      .then(res => res.sort(sortEvents))
      .then(res => {
        dispatch({type: EVENTS_FETCHED, data:res});
      })
      .catch(error => {
        dispatch({type: EVENTS_FAILED, data:error});
      });

  };
}
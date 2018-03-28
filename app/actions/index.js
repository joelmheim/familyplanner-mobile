export const PEOPLE_FETCHED = 'PEOPLE_FETCHED';
export const EVENTS_FETCHED = 'EVENTS_FETCHED';

import * as config from '../config/config';

export function getPeople() {
  return (dispatch) => {
    fetch(config.personsUrl)
      .then(res => res.json())
      .then(res => {
        dispatch({type: PEOPLE_FETCHED, data:res});
      })
      .catch(error => {
        
      });
  };
}

export function getEvents() {
  return (dispatch) => {
    fetch(config.eventsUrl)
      .then(res => res.json())
      .then(res => {
        dispatch({type: EVENTS_FETCHED, data:res});
      })
      .catch(error => {
      
      });

  };
}
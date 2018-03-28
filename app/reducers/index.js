import { combineReducers } from 'redux';
 
import { PEOPLE_FETCHED, EVENTS_FETCHED } from '../actions/';
 
let dataState = { data: [], loading: true };
 
const peopleReducer = (state = dataState, action) => {
  switch (action.type) {
  case PEOPLE_FETCHED:
    state = Object.assign({}, state, { data: action.data, loading: false });
    return state;
  default:
    return state;
  }
};

const eventsReducer = (state = dataState, action) => {
  switch (action.type) {
  case EVENTS_FETCHED:
    state = Object.assign({}, state, { data: action.data, loading: false });
    return state;
  default:
    return state;
  }
};

// Combine all the reducers
const rootReducer = combineReducers({
  people: peopleReducer,
  events: eventsReducer
});
 
export default rootReducer;
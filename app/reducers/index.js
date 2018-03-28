import { combineReducers } from 'redux';
 
import { PEOPLE_FETCHED, PEOPLE_FAILED, EVENTS_FETCHED, EVENTS_FAILED } from '../actions/';
 
let dataState = { data: [], loading: true };
 
const peopleReducer = (state = dataState, action) => {
  switch (action.type) {
  case PEOPLE_FETCHED:
    console.log('People fetched: ', action.data);
    state = Object.assign({}, state, { data: action.data, loading: false });
    return state;
  case PEOPLE_FAILED:
    console.log('People failed: ', action.data);
    state = Object.assign({}, state, { data: action.data, loading: false });
    return state;
  default:
    return state;
  }
};

const eventsReducer = (state = dataState, action) => {
  switch (action.type) {
  case EVENTS_FETCHED:
    console.log('Events fetched: ', action.data);
    state = Object.assign({}, state, { data: action.data, loading: false });
    return state;
  case EVENTS_FAILED:
    console.log('Events failed: ', action.data);
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
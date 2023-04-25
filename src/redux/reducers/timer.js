import { CHANGE_TIMER, RESET_TIMER } from '../actions/changeTimer';

const INITIAL_STATE = {
  time: 30,
};

const timer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CHANGE_TIMER:
    return {
      ...state,
      time: action.payload,
    };
  case RESET_TIMER:
    return {
      ...state,
      time: 30,
    };
  default:
    return state;
  }
};

export default timer;

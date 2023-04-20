import { ADD_NAME, ADD_EMAIL } from '../action';
import { UPDATE_SCORE } from '../actions/updateScore';

const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  score: 0,
  assertions: 0,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_NAME:
    return {
      ...state,
      name: action.name,
    };
  case ADD_EMAIL:
    return {
      ...state,
      gravatarEmail: action.email,
    };
  case UPDATE_SCORE:
    return {
      ...state,
      score: action.payload,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
};

export default player;

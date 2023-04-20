import { SAVE_QUESTIONS } from '../actions/saveQuestions';

const INITIAL_STATE = {
  allQuestions: [],
};

export const questionsSaved = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_QUESTIONS:
    return {
      ...state,
      allQuestions: action.payload,
    };
  default:
    return state;
  }
};

import { combineReducers } from 'redux';
import { questionsSaved } from './questionsSaved';
import timer from './timer';
import user from './user';

const rootReducer = combineReducers({
  user,
  questionsSaved,
  timer,
});

export default rootReducer;

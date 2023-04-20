import { combineReducers } from 'redux';
import { questionsSaved } from './questionsSaved';
import timer from './timer';
import player from './player';

const rootReducer = combineReducers({
  player,
  questionsSaved,
  timer,
});

export default rootReducer;

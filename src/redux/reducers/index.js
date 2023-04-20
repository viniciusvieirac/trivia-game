import { combineReducers } from 'redux';
import { questionsSaved } from './questionsSaved';
import user from './user';

const rootReducer = combineReducers({
  user,
  questionsSaved,
});

export default rootReducer;

import { combineReducers } from 'redux';
import { questionsSaved } from './questionsSaved';

const rootReducer = combineReducers({
  questionsSaved,
});

export default rootReducer;

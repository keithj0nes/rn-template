import { combineReducers } from 'redux';

import authReducer, {addStoryReducer,captureReducer} from './authReducer';

export default combineReducers({
  user: authReducer,
  addStory: addStoryReducer,
  capture: captureReducer
})

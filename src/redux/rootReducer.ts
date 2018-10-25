import { combineReducers } from 'redux';
import user from './user/reducer';
import token from './user/reducer';
import crowdsale from './user/reducer';

export default combineReducers({
  user,
  token,
  crowdsale
});

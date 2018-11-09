import { combineReducers } from 'redux';
import user from './user/reducer';
import token from './token/reducer';
import crowdsale from './crowdsale/reducer';
import persist from './persist/reducer';

export default combineReducers({
  user,
  token,
  crowdsale,
  persist
});

import { combineReducers } from 'redux';
import user from './user/reducer';
import token from './token/reducer';
import crowdsale from './crowdsale/reducer';

export default combineReducers({
  user,
  token,
  crowdsale
});

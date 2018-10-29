import * as tokenTypes from './actions';

const initialState = {};

export default function user(state = initialState, action) {
  switch (action.type) {
    case tokenTypes.CREATE_ETH_TOKEN:
      return {
        ...state,
        isCreating: true,
        isCreated: false
      };

    case tokenTypes.CREATE_ETH_TOKEN_SUCCEEDED:
      return {
        ...state,
        isCreating: false,
        isCreated: true
      };
    case tokenTypes.CREATE_ETH_TOKEN_FAILED:
      return {
        ...state,
        isCreating: false,
        isCreated: false
      };

    default:
      return state;
  }
}

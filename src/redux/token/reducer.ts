import * as consts from './types';

const initialState = {};

export default function user(state = initialState, action) {
  switch (action.type) {
    case consts.CREATE_ETH_TOKEN:
      return {
        ...state,
        isCreating: true,
        isCreated: false
      };

    case consts.CREATE_ETH_TOKEN_SUCCEEDED:
      return {
        ...state,
        isCreating: false,
        isCreated: true
      };
    case consts.CREATE_ETH_TOKEN_FAILED:
      return {
        ...state,
        isCreating: false,
        isCreated: false
      };

    default:
      return state;
  }
}

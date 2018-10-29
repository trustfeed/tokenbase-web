import * as crowdsaleTypes from './actions';

const initialState = {};

export default function user(state = initialState, action) {
  switch (action.type) {
    case crowdsaleTypes.CREATE_ETH_CROWDSALE:
      return {
        ...state,
        isCreating: true,
        isCreated: false
      };

    case crowdsaleTypes.CREATE_ETH_CROWDSALE_SUCCEEDED:
      return {
        ...state,
        isCreating: false,
        isCreated: true
      };
    case crowdsaleTypes.CREATE_ETH_CROWDSALE_FAILED:
      return {
        ...state,
        isCreating: false,
        isCreated: false
      };

    default:
      return state;
  }
}

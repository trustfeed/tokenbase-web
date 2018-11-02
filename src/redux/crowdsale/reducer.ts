import * as crowdsaleTypes from './actions';

const initialState = {};

export default function user(state = initialState, action) {
  switch (action.type) {
    case crowdsaleTypes.CREATE_ETH_CROWDSALE:
      return {
        ...state,
        isCreating: true,
        hasCreated: false
      };
    case crowdsaleTypes.CREATE_ETH_CROWDSALE_SUCCEEDED:
      return {
        ...state,
        isCreating: false,
        hasCreated: true
      };
    case crowdsaleTypes.CREATE_ETH_CROWDSALE_FAILED:
      return {
        ...state,
        isCreating: false,
        hasCreated: false
      };

    case crowdsaleTypes.UPDATE_ETH_CROWDSALE:
      return {
        ...state,
        isUpdating: true,
        hasUpdated: false
      };
    case crowdsaleTypes.UPDATE_ETH_CROWDSALE_SUCCEEDED:
      return {
        ...state,
        isUpdating: false,
        hasUpdated: true
      };
    case crowdsaleTypes.UPDATE_ETH_CROWDSALE_FAILED:
      return {
        ...state,
        isUpdating: false,
        hasUpdated: false
      };

    case crowdsaleTypes.GET_ETH_CROWDSALES:
      return {
        ...state,
        isGettingEthCrowdsales: true,
        ethCrowdsales: []
      };
    case crowdsaleTypes.GET_ETH_CROWDSALES_SUCCEEDED:
      return {
        ...state,
        isGettingEthCrowdsales: false,
        ethCrowdsales: action.payload.ethCrowdsales
      };
    case crowdsaleTypes.GET_ETH_CROWDSALES_FAILED:
      return {
        ...state,
        isGettingEthCrowdsales: false,
        ethCrowdsales: []
      };

    case crowdsaleTypes.GET_ETH_CROWDSALE:
      return {
        ...state,
        isGettingEthCrowdsale: true,
        ethCrowdsale: undefined
      };
    case crowdsaleTypes.GET_ETH_CROWDSALE_SUCCEEDED:
      return {
        ...state,
        isGettingEthCrowdsale: false,
        ethCrowdsale: action.payload.ethCrowdsale
      };
    case crowdsaleTypes.GET_ETH_CROWDSALE_FAILED:
      return {
        ...state,
        isGettingEthCrowdsale: false,
        ethCrowdsale: undefined
      };

    case crowdsaleTypes.CREAR_ETH_CROWDSALE:
      return {
        ...state,
        ethCrowdsale: undefined
      };

    case crowdsaleTypes.FINALISE_ETH_CROWDSALE:
      return {
        ...state,
        isFinalising: true,
        hasFinalised: false
      };
    case crowdsaleTypes.FINALISE_ETH_CROWDSALE_SUCCEEDED:
      return {
        ...state,
        isFinalising: false,
        hasFinalised: true
      };
    case crowdsaleTypes.FINALISE_ETH_CROWDSALE_FAILED:
      return {
        ...state,
        isFinalising: false,
        hasFinalised: false
      };

    default:
      return state;
  }
}

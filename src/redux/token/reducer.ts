import * as tokenTypes from './actions';

const initialState = {};

export default function user(state = initialState, action) {
  switch (action.type) {
    case tokenTypes.CREATE_ETH_TOKEN:
      return {
        ...state,
        isCreating: true,
        hasCreated: false
      };
    case tokenTypes.CREATE_ETH_TOKEN_SUCCEEDED:
      return {
        ...state,
        isCreating: false,
        hasCreated: true
      };
    case tokenTypes.CREATE_ETH_TOKEN_FAILED:
      return {
        ...state,
        isCreating: false,
        hasCreated: false
      };

    case tokenTypes.UPDATE_ETH_TOKEN:
      return {
        ...state,
        isUpdating: true,
        hasUpdated: false
      };
    case tokenTypes.UPDATE_ETH_TOKEN_SUCCEEDED:
      return {
        ...state,
        isUpdating: false,
        hasUpdated: true
      };
    case tokenTypes.UPDATE_ETH_TOKEN_FAILED:
      return {
        ...state,
        isUpdating: false,
        hasUpdated: false
      };

    case tokenTypes.GET_ETH_TOKENS:
      return {
        ...state,
        isGettingEthTokens: true,
        ethTokens: []
      };
    case tokenTypes.GET_ETH_TOKENS_SUCCEEDED:
      return {
        ...state,
        isGettingEthTokens: false,
        ethTokens: action.payload.ethTokens
      };
    case tokenTypes.GET_ETH_TOKENS_FAILED:
      return {
        ...state,
        isGettingEthTokens: false,
        ethTokens: []
      };

    case tokenTypes.GET_ETH_TOKEN:
      return {
        ...state,
        isGettingEthToken: true,
        ethToken: undefined
      };
    case tokenTypes.GET_ETH_TOKEN_SUCCEEDED:
      return {
        ...state,
        isGettingEthToken: false,
        ethToken: action.payload.ethToken
      };
    case tokenTypes.GET_ETH_TOKEN_FAILED:
      return {
        ...state,
        isGettingEthToken: false,
        ethToken: undefined
      };

    case tokenTypes.CREAR_ETH_TOKEN:
      return {
        ...state,
        ethToken: undefined
      };

    case tokenTypes.FINALISE_ETH_TOKEN:
      return {
        ...state,
        isFinalising: true,
        hasFinalised: false
      };
    case tokenTypes.FINALISE_ETH_TOKEN_SUCCEEDED:
      return {
        ...state,
        isFinalising: false,
        hasFinalised: true
      };
    case tokenTypes.FINALISE_ETH_TOKEN_FAILED:
      return {
        ...state,
        isFinalising: false,
        hasFinalised: false
      };

    default:
      return state;
  }
}

export const CREATE_ETH_TOKEN = 'CREATE_ETH_TOKEN';
export const CREATE_ETH_TOKEN_SUCCEEDED = 'CREATE_ETH_TOKEN_SUCCEEDED';
export const CREATE_ETH_TOKEN_FAILED = 'CREATE_ETH_TOKEN_FAILED';
export const createEthToken = (body) => ({
  type: CREATE_ETH_TOKEN,
  payload: { body }
});

export const UPDATE_ETH_TOKEN = 'UPDATE_ETH_TOKEN';
export const UPDATE_ETH_TOKEN_SUCCEEDED = 'UPDATE_ETH_TOKEN_SUCCEEDED';
export const UPDATE_ETH_TOKEN_FAILED = 'UPDATE_ETH_TOKEN_FAILED';
export const updateEthToken = (body, id) => ({
  type: UPDATE_ETH_TOKEN,
  payload: { body, id }
});

export const GET_ETH_TOKENS = 'GET_ETH_TOKENS';
export const GET_ETH_TOKENS_SUCCEEDED = 'GET_ETH_TOKENS_SUCCEEDED';
export const GET_ETH_TOKENS_FAILED = 'GET_ETH_TOKENS_FAILED';
export const getEthTokens = () => ({
  type: GET_ETH_TOKENS
});

export const GET_ETH_TOKEN = 'GET_ETH_TOKEN';
export const GET_ETH_TOKEN_SUCCEEDED = 'GET_ETH_TOKEN_SUCCEEDED';
export const GET_ETH_TOKEN_FAILED = 'GET_ETH_TOKEN_FAILED';
export const getEthToken = (id) => ({
  type: GET_ETH_TOKEN,
  payload: { id }
});

export const CREAR_ETH_TOKEN = 'CREAR_ETH_TOKEN';
export const clearEthToken = () => ({
  type: CREAR_ETH_TOKEN
});

export const FINALISE_ETH_TOKEN = 'FINALISE_ETH_TOKEN';
export const FINALISE_ETH_TOKEN_SUCCEEDED = 'FINALISE_ETH_TOKEN_SUCCEEDED';
export const FINALISE_ETH_TOKEN_FAILED = 'FINALISE_ETH_TOKEN_FAILED';
export const finaliseEthToken = (id) => ({
  type: FINALISE_ETH_TOKEN,
  payload: { id }
});

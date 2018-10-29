export const CREATE_ETH_TOKEN = 'CREATE_ETH_TOKEN';
export const CREATE_ETH_TOKEN_SUCCEEDED = 'CREATE_ETH_TOKEN_SUCCEEDED';
export const CREATE_ETH_TOKEN_FAILED = 'CREATE_ETH_TOKEN_FAILED';
export const createEthToken = (body) => ({
  type: CREATE_ETH_TOKEN,
  payload: body
});

export const GET_ETH_TOKENS = 'GET_ETH_TOKENS';
export const GET_ETH_TOKENS_SUCCEEDED = 'GET_ETH_TOKENS_SUCCEEDED';
export const GET_ETH_TOKENS_FAILED = 'GET_ETH_TOKENS_FAILED';
export const getEthTokens = () => ({
  type: GET_ETH_TOKENS
});

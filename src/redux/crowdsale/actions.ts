export const CREATE_ETH_CROWDSALE = 'CREATE_ETH_CROWDSALE';
export const CREATE_ETH_CROWDSALE_SUCCEEDED = 'CREATE_ETH_CROWDSALE_SUCCEEDED';
export const CREATE_ETH_CROWDSALE_FAILED = 'CREATE_ETH_CROWDSALE_FAILED';
export const createEthCrowdsale = (body) => ({
  type: CREATE_ETH_CROWDSALE,
  payload: body
});

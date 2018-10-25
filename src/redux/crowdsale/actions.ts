import * as consts from './types';

export const createEthCrowdsale = (body) => ({
  type: consts.CREATE_ETH_CROWDSALE,
  payload: body
});

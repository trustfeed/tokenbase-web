import * as consts from './types';

export const createEthToken = (body) => ({
  type: consts.CREATE_ETH_TOKEN,
  payload: body
});
